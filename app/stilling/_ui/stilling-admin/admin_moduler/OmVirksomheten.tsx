import { ArbeidsgiverDTO, useFinnArbeidsgiver } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import LeggTilKontaktperson from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/LeggTilKontaktperson';
import RedigerBoks from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/RedigerBoks';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import RikTekstEditor from '@/components/rikteksteditor/RikTekstEditor';
import { TasklistIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, FormSummary, Heading, TextField, UNSAFE_Combobox } from '@navikt/ds-react';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { logger } from '@navikt/next-logger';


export const ValgtArbeidsgiverVisning: FC<{
  arbeidsgiver: ArbeidsgiverDTO;
}> = ({ arbeidsgiver }) => (
  <FormSummary className='mt-4'>
    <FormSummary.Header>
      <FormSummary.Heading level='2'>Valgt arbeidsgiver</FormSummary.Heading>
    </FormSummary.Header>

    <FormSummary.Answers>
      <FormSummary.Answer>
        <FormSummary.Label>Navn</FormSummary.Label>
        <FormSummary.Value>{arbeidsgiver?.navn}</FormSummary.Value>
      </FormSummary.Answer>

      <FormSummary.Answer>
        <FormSummary.Label>Organisasjonsnummer</FormSummary.Label>
        <FormSummary.Value>
          {arbeidsgiver?.organisasjonsnummer}
        </FormSummary.Value>
      </FormSummary.Answer>

      <FormSummary.Answer>
        <FormSummary.Label>Adresse</FormSummary.Label>
        <FormSummary.Value>
          {arbeidsgiver?.adresse?.adresse ?? '-'}
        </FormSummary.Value>
        <FormSummary.Value>
          {arbeidsgiver?.adresse?.postnummer ?? '-'},{' '}
          {arbeidsgiver?.adresse?.poststed ?? '-'}
        </FormSummary.Value>

        <FormSummary.Value>
          {arbeidsgiver?.adresse?.kommune ?? '-'}
        </FormSummary.Value>
      </FormSummary.Answer>
    </FormSummary.Answers>
  </FormSummary>
);

export default function OmVirksomheten() {
  const { register, setValue, getValues, watch } =
    useFormContext<StillingsDataDTO>();
  const [søkeOrd, setSøkeord] = useState<string>('');
  const { isLoading, error, data } = useFinnArbeidsgiver(søkeOrd);
  const kategori = watch('stillingsinfo.stillingskategori');
  const erFormidling = kategori === Stillingskategori.Formidling;

  // Sett beskrivelsen til "Etterregistrering" hvis det er formidling
  useEffect(() => {
    if (erFormidling) {
      setValue('stilling.properties.employerdescription', 'Etterregistrering');
    }
  }, [erFormidling, setValue]);
  // Hjelper: mappe fra stilling.employer (form-format) til ArbeidsgiverDTO (visningsformat)
  const mapEmployerToArbeidsgiverDTO = (
    employer: any | null | undefined,
  ): ArbeidsgiverDTO | null => {
    logger.info(`employer i mapEmployerToArbeidsgiverDTO: ${JSON.stringify(employer)}`);

    if (!employer) return null;
    const loc = employer.location ?? null;
    const adresse = loc
      ? {
          land: loc.country === 'NORGE' ? 'Norge' : (loc.country ?? 'Norge'),
          landkode: 'NO',
          kommune: loc.municipal ?? '',
          kommunenummer: loc.municipalCode ?? '',
          poststed: loc.city ?? '',
          postnummer: loc.postalCode ?? '',
          adresse: loc.address ?? '',
        }
      : null;
    const dto: ArbeidsgiverDTO = {
      organisasjonsnummer: employer.orgnr ?? '',
      navn: employer.name ?? '',
      organisasjonsform: employer.orgform ?? '',
      antallAnsatte: employer.employees ?? null,
      overordnetEnhet: employer.parentOrgnr ?? null,
      adresse,
      naringskoder: null,
    };
    return dto;
  };

  const [arbeidsgiver, setArbeidsgiverState] = useState<ArbeidsgiverDTO | null>(
    mapEmployerToArbeidsgiverDTO(getValues('stilling.employer')),
  );

  // Hold valgt arbeidsgiver i sync når stilling.employer endres i form
  const employerWatch = watch('stilling.employer');
  useEffect(() => {
    setArbeidsgiverState(mapEmployerToArbeidsgiverDTO(employerWatch));
  }, [employerWatch]);

  const harVærtPublisert = getValues('stilling.firstPublished');

  const setArbeidsgiver = (arbeidsgiver: ArbeidsgiverDTO) => {
    logger.info(`arbeidsgiver i setArbeidsgiver: ${JSON.stringify(arbeidsgiver)}`);

    setArbeidsgiverState(arbeidsgiver);
    const eksisterende = getValues('stilling.employer') ?? ({} as any);
    setValue('stilling.businessName', arbeidsgiver.navn ?? null);
    setValue('stilling.employer', {
      ...eksisterende,
      orgnr: arbeidsgiver.organisasjonsnummer ?? '',
      name: arbeidsgiver.navn ?? '',
      parentOrgnr: arbeidsgiver.overordnetEnhet ?? '',
      orgform: arbeidsgiver.organisasjonsform ?? '',
      employees: arbeidsgiver.antallAnsatte ?? null,
      location: {
        ...(eksisterende.location ?? {}),
        municipalCode: arbeidsgiver.adresse?.kommunenummer ?? '',
        address: arbeidsgiver.adresse?.adresse ?? '',
        postalCode: arbeidsgiver.adresse?.postnummer ?? '',
        county: '',
        country:
          arbeidsgiver.adresse?.land === 'Norge'
            ? 'NORGE'
            : (arbeidsgiver.adresse?.land ?? 'NORGE'),
        municipal: arbeidsgiver.adresse?.kommune ?? '',
        city: arbeidsgiver.adresse?.poststed ?? '',
        properties: {
          nace2:
            (arbeidsgiver.naringskoder &&
              JSON.stringify(
                arbeidsgiver.naringskoder.map((naringskode) => {
                  return {
                    code: naringskode.kode,
                    name: naringskode.beskrivelse,
                  };
                }),
              )) ??
            null,
        },
      },
    });
    const locationList = getValues('stilling.locationList') ?? [];
    if (locationList.length === 0 && arbeidsgiver.adresse) {
      setValue('stilling.locationList', [
        {
          address: arbeidsgiver.adresse.adresse ?? '',
          postalCode: arbeidsgiver.adresse.postnummer ?? '',
          city: arbeidsgiver.adresse.poststed ?? '',
          county: '',
          municipal: arbeidsgiver.adresse.kommune ?? '',
          municipalCode: arbeidsgiver.adresse.kommunenummer ?? '',
          country: arbeidsgiver.adresse.land ?? 'Norge',
        },
      ]);
    }
  };

  return (
    <RedigerBoks tittel='Om virksomheten'>
      <div className='flex flex-col gap-4'>
        <div role='search'>
          {!harVærtPublisert && (
            <UNSAFE_Combobox
              isLoading={isLoading}
              label='Arbeidsgivers navn eller organisasjonsnummer'
              options={
                data?.map(
                  (arbeidsgiver) =>
                    `${arbeidsgiver.navn} - ${arbeidsgiver.organisasjonsnummer}`,
                ) ?? []
              }
              shouldAutocomplete={true}
              onChange={(verdi) => setSøkeord(verdi)}
              onToggleSelected={(valg) => {
                const orgnr = valg.split(' - ').at(-1);
                const selectedArbeidsgiver = data?.find(
                  (a) => a.organisasjonsnummer === orgnr,
                );
                if (selectedArbeidsgiver) setArbeidsgiver(selectedArbeidsgiver);
              }}
            />
          )}
          {arbeidsgiver && (
            <ValgtArbeidsgiverVisning arbeidsgiver={arbeidsgiver} />
          )}
        </div>
        {error && (
          <Alert className='mt-8' variant='error'>
            {JSON.stringify(error)}
          </Alert>
        )}
        {!erFormidling && (
          <>
            <BodyLong className='font-bold'>
              Beskrivelse av bedriften (valgfritt)
            </BodyLong>
            <RikTekstEditor
              id='rediger-om-virksomheten'
              tekst={watch('stilling.properties.employerdescription') ?? ''}
              onChange={(e) =>
                setValue('stilling.properties.employerdescription', e)
              }
            />
            <TextField
              label='Nettside (valgfritt)'
              {...register('stilling.properties.employerhomepage')}
            />
          </>
        )}
        <Heading size='small' className='flex gap-2 items-center'>
          <TasklistIcon className='shrink-0' /> Kontaktpersoner
        </Heading>
        <LeggTilKontaktperson />
      </div>
    </RedigerBoks>
  );
}
