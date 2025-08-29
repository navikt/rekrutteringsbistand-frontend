import {
  ArbeidsgiverDTO,
  useFinnArbeidsgiver,
} from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import LeggTilKontaktperson from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/LeggTilKontaktperson';
import RedigerBoks from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/RedigerBoks';
import RikTekstEditor from '@/components/felles/rikteksteditor/RikTekstEditor';
import { TasklistIcon } from '@navikt/aksel-icons';
import {
  Alert,
  BodyLong,
  FormSummary,
  Heading,
  TextField,
  UNSAFE_Combobox,
} from '@navikt/ds-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function OmVirksomheten() {
  const { register, setValue, getValues, watch } =
    useFormContext<StillingsDataDTO>();
  const [søkeOrd, setSøkeord] = useState<string>('');
  const { isLoading, error, data } = useFinnArbeidsgiver(søkeOrd);
  const [arbeidsgiver, setArbeidsgiverState] = useState<ArbeidsgiverDTO | null>(
    null,
  );

  const setArbeidsgiver = (arbeidsgiver: ArbeidsgiverDTO) => {
    setArbeidsgiverState(arbeidsgiver);
    const eksisterende = getValues('stilling.employer') ?? ({} as any);
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
        country: arbeidsgiver.adresse?.land ?? 'Norge',
        municipal: arbeidsgiver.adresse?.kommune ?? '',
        city: arbeidsgiver.adresse?.poststed ?? '',
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
          {arbeidsgiver && (
            <FormSummary className='mt-4'>
              <FormSummary.Header>
                <FormSummary.Heading level='2'>
                  Valgt arbeidsgiver
                </FormSummary.Heading>
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
          )}
        </div>
        {error && (
          <Alert className='mt-8' variant='error'>
            {JSON.stringify(error)}
          </Alert>
        )}
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
        <Heading size='small' className='flex gap-2 items-center'>
          <TasklistIcon className='shrink-0' /> Kontaktpersoner
        </Heading>
        <LeggTilKontaktperson />
      </div>
    </RedigerBoks>
  );
}
