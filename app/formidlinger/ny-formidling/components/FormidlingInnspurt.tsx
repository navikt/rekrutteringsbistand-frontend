import { Buildings2Icon, PencilIcon, PersonIcon } from '@navikt/aksel-icons';
import {
  Alert,
  BodyShort,
  Box,
  Button,
  Detail,
  Heading,
} from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { formidleUsynligKandidatEndepunkt } from '../../../api/kandidat/formidleKandidat';
import { kandidatlisteEndepunkt } from '../../../api/kandidat/useKandidatliste';
import { kandidatlisteInfoEndepunkt } from '../../../api/kandidat/useKandidatlisteInfo';
import { OpprettNyStillingDTO } from '../../../api/stilling/ny-stilling/dto';
import { opprettNyStillingEndepunkt } from '../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { useApplikasjonContext } from '../../../ApplikasjonContext';
import { Stillingskategori } from '../../../stilling/stilling-typer';
import { mapFormTilFormidling } from '../mapFormidling';
import { FormidlingDataForm } from '../redigerFormidlingFormType';

const FormidlingInnspurt = () => {
  const router = useRouter();
  const { getValues, handleSubmit } = useFormContext<FormidlingDataForm>();

  const { brukerData, valgtNavKontor } = useApplikasjonContext();

  const [senderSkjema, setSenderSkjema] = useState(false);
  const [steg, setSteg] = useState('Oppretter formidling');
  const formidlingsVerdier = getValues();

  const onSubmit = async (data: FormidlingDataForm) => {
    setSenderSkjema(true);
    const formidlingData = {
      ...data,
      reportee: `${brukerData.fornavn} ${brukerData.etternavn}`,
      navIdent: brukerData.ident,
      navKontor: valgtNavKontor,
    };

    const opprettStillingDto: OpprettNyStillingDTO = {
      kategori: Stillingskategori.Formidling,
      stilling: {
        administration: {
          status: 'PENDING',
          reportee: formidlingData.reportee,
          navIdent: formidlingData.navIdent,
        },
        createdBy: 'pam-rekrutteringsbistand',
        updatedBy: 'pam-rekrutteringsbistand',
        source: 'DIR',
        medium: 'DIR',
        businessName: formidlingData.omFormidlingen?.organisasjon?.navn ?? '',
        privacy: 'INTERNAL_NOT_SHOWN',
        employer: {
          orgnr:
            formidlingData.omFormidlingen?.organisasjon?.organisasjonsnummer ??
            '',
          name: formidlingData.omFormidlingen?.organisasjon?.navn ?? '',
          location: {
            address:
              formidlingData.omFormidlingen?.organisasjon?.adresse?.adresse ??
              '',
            postalCode:
              formidlingData.omFormidlingen?.organisasjon?.adresse
                ?.postnummer ?? '',
            county:
              formidlingData.omFormidlingen?.organisasjon?.adresse?.kommune ??
              '',
            country:
              formidlingData.omFormidlingen?.organisasjon?.adresse?.land ?? '',
            municipal:
              formidlingData.omFormidlingen?.organisasjon?.adresse
                ?.kommunenummer ?? '',
            city:
              formidlingData.omFormidlingen?.organisasjon?.adresse?.poststed ??
              '',
          },
        },
      },
    };

    const opprettStilling = await fetch(`/api/stilling/ny-stilling`, {
      method: 'POST',
      body: JSON.stringify(opprettStillingDto),
    });
    const nyStillingsData = await opprettStilling.json();

    setSteg('Henter opprettet formidling');
    const hentStilling = await fetch(
      `/api/stilling/rekrutteringsbistandstilling/${nyStillingsData.stilling.uuid}`,
      {
        method: 'GET',
      },
    );
    const hentStillingData = await hentStilling.json();

    setSteg('Oppdaterer formidling');
    const oppdatertFormidlingData = mapFormTilFormidling(
      {
        ...formidlingData,
        navKontor: formidlingData.navKontor?.navKontor ?? '',
      },
      hentStillingData,
    );
    const publisertStilling = await fetch(opprettNyStillingEndepunkt, {
      method: 'PUT',
      body: JSON.stringify(oppdatertFormidlingData),
    });
    const publisertStillingData = await publisertStilling.json();

    setSteg('Verifiser at kandidatliste er opprettet');

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const kandidatlisteInfo = await fetch(
      kandidatlisteInfoEndepunkt(publisertStillingData.stilling.uuid)!,
      { method: 'GET' },
    );
    const kandidatListeIdRespons = await kandidatlisteInfo.json();
    const kandidatlisteId = kandidatListeIdRespons.kandidatlisteId;

    formidlingData?.omKandidatene.map(async (kandidat: any) => {
      setSteg(
        `Setter kandidat ${kandidat.navn.fornavn} ${kandidat.navn.etternavn} til fått jobben`,
      );
      await new Promise((resolve) => setTimeout(resolve, 500));

      return fetch(formidleUsynligKandidatEndepunkt(kandidatlisteId), {
        method: 'POST',
        body: JSON.stringify({
          fnr: kandidat.fnr,
          fåttJobb: true,
          navKontor: valgtNavKontor?.navKontor ?? '',
          stillingsId: publisertStillingData.stilling.uuid,
        }),
      }).then(async () => {
        // Hent kandidatliste på nytt for å unngå låsing
        await fetch(
          kandidatlisteEndepunkt(publisertStillingData.stilling.uuid)!,
        );
      });
    });

    setSteg('Fullfører formidling');

    router.push(`/formidlinger/${publisertStillingData.stilling.uuid}`);
  };

  return (
    <div className='space-y-4'>
      <Heading size='large' level='1'>
        Innspurt
      </Heading>
      <BodyShort>Se over at alt stemmer og fullfør registreringen.</BodyShort>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box.New>
          <div className='flex justify-between items-center w-full mb-4'>
            <Heading size='small' level='2'>
              Om kandidatene
            </Heading>

            <Button
              variant='tertiary'
              icon={<PencilIcon aria-hidden />}
              iconPosition='right'
            >
              Endre
            </Button>
          </div>
          <hr />
          <div className='space-y-4'>
            {formidlingsVerdier.omKandidatene?.map((person) => (
              <div key={person.fnr} className='flex items-center gap-2'>
                <PersonIcon className='text-gray-600' aria-hidden />
                <div>
                  <BodyShort>
                    {person.navn.fornavn} {person.navn.etternavn}
                  </BodyShort>
                  <Detail>{person.fnr}</Detail>
                </div>
              </div>
            ))}
          </div>
        </Box.New>

        <Box.New className='mt-8'>
          <div className='flex justify-between items-center w-full mb-4'>
            <Heading size='small' level='2'>
              Om arbeidsgiver og stilling
            </Heading>
            <Button
              variant='tertiary'
              icon={<PencilIcon aria-hidden />}
              iconPosition='right'
            >
              Endre
            </Button>
          </div>
          <hr />
          <div className='space-y-4'>
            <div className='flex items-start gap-2'>
              <Buildings2Icon className='text-gray-600 mt-1' aria-hidden />
              <div>
                <BodyShort>Ordknapp Blomstrete Tiger AS</BodyShort>
                <Detail>Organisasjonsnummer: 974652277</Detail>
              </div>
            </div>

            <div className='space-y-4'>
              <BodyShort>
                {formidlingsVerdier.omFormidlingen?.categoryList?.[0]?.name}
              </BodyShort>
              <BodyShort>{formidlingsVerdier.omFormidlingen?.sektor}</BodyShort>
              {/* <BodyShort> */}
              {/* {formidlingsVerdier.omFormidlingen?} */}
              {/* </BodyShort> */}
              <BodyShort>
                {formidlingsVerdier.omFormidlingen?.ansettelsesform}
              </BodyShort>
              <BodyShort>
                {formidlingsVerdier.omFormidlingen?.arbeidstidsordning}
              </BodyShort>
              <BodyShort>
                {formidlingsVerdier.omFormidlingen?.omfangKode}
              </BodyShort>
            </div>
          </div>
        </Box.New>

        {senderSkjema && (
          <Alert variant='info'>
            Oppretter formidling, dette kan ta litt tid.
            <ul>{steg && <li>{steg}...</li>}</ul>
          </Alert>
        )}
        <div className='mt-8'>
          <Button
            variant='primary'
            className='w-full'
            loading={senderSkjema}
            onClick={() => onSubmit(getValues())}
          >
            Fullfør registreringen
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormidlingInnspurt;
