import { FormidlingDataForm } from '@/app/etterregistrering/ny-etterregistrering/redigerFormidlingFormType';
import { InkluderingsTag } from '@/app/stilling/[stillingsId]/omStillingen/StillingSidebar/StillingInkludering';
import { getInkluderingsInfo } from '@/app/stilling/[stillingsId]/rediger/_ui/praktiskInfo/inkluderingsTagTekst';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import {
  Alert,
  BodyShort,
  Button,
  FormSummary,
  Heading,
} from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const FormidlingInnspurt = () => {
  const router = useRouter();

  const { track } = useUmami();

  const { getValues, handleSubmit } = useFormContext<FormidlingDataForm>();

  const { brukerData, valgtNavKontor } = useApplikasjonContext();

  const [senderSkjema, setSenderSkjema] = useState(false);
  const formidlingsVerdier = getValues();

  const onSubmit = async (data: FormidlingDataForm) => {
    setSenderSkjema(true);
    const formidlingData = {
      ...data,
      reportee: `${brukerData.fornavn} ${brukerData.etternavn}`,
      navIdent: brukerData.ident,
      navKontor: valgtNavKontor?.navKontor,
    };

    try {
      const nyFormidling = await fetch(
        '/api/etterregistrering/opprett-formidling',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formidlingData),
        },
      );

      track(
        UmamiEvent.Etterregistrering.fullført_etterregistrering_av_formidling,
      );

      track(UmamiEvent.Etterregistrering.yrkestittel_etterregistrering, {
        yrkestittel: formidlingData.omFormidlingen?.categoryList?.[0]?.name,
      });

      const data = await nyFormidling.json();

      if (data.stillingsId) {
        router.push('/etterregistrering?portefolje=visMine');
      }
    } catch (error) {
      throw new RekbisError({
        message: 'Kunne ikke opprette formidling',
        error,
      });
    }
  };

  return (
    <div className='space-y-4'>
      <Heading size='large' level='1'>
        Innspurt
      </Heading>
      <BodyShort>Se over at alt stemmer og fullfør registreringen.</BodyShort>
      {senderSkjema && (
        <Alert variant='info'>
          Oppretter formidling, dette kan ta litt tid.
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <Box.New>




            <div className='space-y-4'>
              <BodyShort>
                {formidlingsVerdier.omFormidlingen?.categoryList?.[0]?.name}
              </BodyShort>
              <BodyShort>{formidlingsVerdier.omFormidlingen?.sektor}</BodyShort>

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
        </Box.New> */}
        <FormSummary>
          <FormSummary.Header>
            <FormSummary.Heading level='2'>
              Etterregistrering
            </FormSummary.Heading>
          </FormSummary.Header>
          <FormSummary.Answers>
            <FormSummary.Answer>
              <FormSummary.Label>Kandidater</FormSummary.Label>
              {formidlingsVerdier.omKandidatene?.map((person) => (
                <FormSummary.Value key={person.fnr}>
                  {person.navn.fornavn} {person.navn.etternavn}
                  <br />
                  {person.fnr}
                </FormSummary.Value>
              ))}
            </FormSummary.Answer>

            <FormSummary.Answer>
              <FormSummary.Label>Arbeidsgiver</FormSummary.Label>
              <FormSummary.Value>
                {formidlingsVerdier.omFormidlingen.organisasjon?.navn}
                <br />
                Organisasjonsnummer:{' '}
                {
                  formidlingsVerdier.omFormidlingen.organisasjon
                    ?.organisasjonsnummer
                }
              </FormSummary.Value>
            </FormSummary.Answer>

            <FormSummary.Answer>
              <FormSummary.Label>Yrkestittel</FormSummary.Label>
              <FormSummary.Value>
                {formidlingsVerdier.omFormidlingen?.categoryList?.[0]?.name}
              </FormSummary.Value>
            </FormSummary.Answer>

            <FormSummary.Answer>
              <FormSummary.Label>Sektor</FormSummary.Label>
              <FormSummary.Value>
                {formidlingsVerdier.omFormidlingen?.sektor}
              </FormSummary.Value>
            </FormSummary.Answer>

            <FormSummary.Answer>
              <FormSummary.Label>Ansettelsesform</FormSummary.Label>
              <FormSummary.Value>
                {formidlingsVerdier.omFormidlingen?.ansettelsesform}
              </FormSummary.Value>
            </FormSummary.Answer>

            <FormSummary.Answer>
              <FormSummary.Label>Arbeidstidsordning</FormSummary.Label>
              <FormSummary.Value>
                {formidlingsVerdier.omFormidlingen?.arbeidstidsordning ?? '-'}
              </FormSummary.Value>
            </FormSummary.Answer>

            <FormSummary.Answer>
              <FormSummary.Label>Omfang</FormSummary.Label>
              <FormSummary.Value>
                {formidlingsVerdier.omFormidlingen?.omfangKode}
                {formidlingsVerdier.omFormidlingen?.omfangProsent && (
                  <div>
                    <br />
                    {formidlingsVerdier.omFormidlingen?.omfangProsent}%
                  </div>
                )}
              </FormSummary.Value>
            </FormSummary.Answer>

            <FormSummary.Answer>
              <FormSummary.Label>Arbeidssted</FormSummary.Label>
              <FormSummary.Value>
                {formidlingsVerdier.omFormidlingen?.adresser?.map(
                  (adresse, index) => {
                    return (
                      <div key={index}>
                        {adresse.address}, {adresse.postalCode} {adresse.city}
                      </div>
                    );
                  },
                )}
                {formidlingsVerdier.omFormidlingen?.lokasjoner?.map(
                  (lokasjon, index) => {
                    return (
                      <div key={index}>
                        {lokasjon.county}, {lokasjon.municipal}
                      </div>
                    );
                  },
                )}
              </FormSummary.Value>
            </FormSummary.Answer>

            <FormSummary.Answer>
              <FormSummary.Label>Inkludering</FormSummary.Label>
              <FormSummary.Value>
                {formidlingsVerdier.omTilrettelegging?.tags?.map(
                  (tag, index) => {
                    const info = getInkluderingsInfo(tag);

                    if (tag == InkluderingsTag.StatligInkluderingsdugnad) {
                      return 'Inkluderingssamarbeid med offentlig virksomhet';
                    }

                    return (
                      <div key={index}>
                        {info.tittel}
                        {info.beskrivelse && (
                          <div className='text-sm'>{info.beskrivelse}</div>
                        )}
                      </div>
                    );
                  },
                )}
                {formidlingsVerdier.omTilrettelegging
                  ?.statligeInkluderingsdugnade
                  ? 'Inkluderingssamarbeid med offentlig virksomhet'
                  : ''}
              </FormSummary.Value>
            </FormSummary.Answer>
          </FormSummary.Answers>
        </FormSummary>
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
