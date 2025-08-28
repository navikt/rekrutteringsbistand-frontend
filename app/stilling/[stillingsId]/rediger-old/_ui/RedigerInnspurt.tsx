import { DatoVelger } from '../../rediger/_ui/_ui/DatoVelger';
import OppsummerValidering from './OppsummerValidering';
import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import {
  mapFormTilStilling,
  StillingSynlighet,
} from '@/app/stilling/[stillingsId]/rediger-old/mapStilling';
import { StillingsDataForm } from '@/app/stilling/[stillingsId]/rediger-old/redigerFormType.zod';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { ArrowLeftIcon, CheckmarkCircleIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Button,
  Checkbox,
  CheckboxGroup,
  ErrorMessage,
  ErrorSummary,
  Heading,
  Label,
  TextField,
} from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';

const STEG_MAP: Record<string, string> = {
  omVirksomheten: 'om-virksomheten',
  omTilrettelegging: 'tilrettelegging',
  omStillingen: 'om-stillingen',
  praktiskInfo: 'praktisk-info',
  omFormidlingen: 'om-formidlingen',
};

export const RedigerInnspurt: React.FC<{
  stegNummer: number;
  forrigeSteg: () => void;
}> = ({ stegNummer, forrigeSteg }) => {
  const { track } = useUmami();
  const { stillingsData, refetch } = useStillingsContext();
  const { valgtNavKontor, brukerData } = useApplikasjonContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [sendeSoknad, setSendeSoknad] = useState<string[]>([]);

  const handleChange = (val: string[]) => setSendeSoknad(val);

  const {
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useFormContext<StillingsDataForm>();

  const onSubmit: SubmitHandler<StillingsDataForm> = async (data) => {
    setIsLoading(true);

    const nyStillingsData = mapFormTilStilling(data, stillingsData);

    const publiserStillingsData = {
      ...nyStillingsData,
      stilling: {
        ...nyStillingsData.stilling,
        status: 'ACTIVE',
        administration: {
          ...nyStillingsData.stilling.administration,
          status: 'DONE',
        },
        firstPublished: true,
      },
    };

    track(UmamiEvent.Stilling.ny_stilling_info, {
      yrkestittel: publiserStillingsData.stilling.categoryList?.[0]?.name,
      sektor: publiserStillingsData.stilling.properties?.sector,
      ansettelsesform:
        publiserStillingsData.stilling.properties?.engagementtype,
      arbeidstidsordning:
        publiserStillingsData.stilling?.properties?.jobarrangement,
      omfangIProsent: publiserStillingsData.stilling.properties?.jobpercentage,
      arbeidssted: publiserStillingsData.stilling.locationList,
    });
    const response = await oppdaterStilling(publiserStillingsData, {
      eierNavident: brukerData.ident,
      eierNavn: brukerData.navn,
      eierNavKontorEnhetId: valgtNavKontor?.navKontor,
    });

    if (response.stilling.uuid) {
      setTimeout(() => {
        refetch();
        router.push(`/stilling/${response.stilling.uuid}`);
      }, 500);
    } else {
      alert('Feil ved opprettelse av stilling');
    }

    setIsLoading(false);
  };

  const mapError = (error: FieldErrors<StillingsDataForm>) => {
    if (Array.isArray(error)) {
      return error.map((err, index) => {
        if (typeof err === 'object') {
          return Object.entries(err).map(([field, fieldError]) => {
            if (
              fieldError &&
              typeof fieldError === 'object' &&
              'message' in fieldError
            ) {
              return (
                <ErrorSummary.Item key={`${index}-${field}`}>
                  {fieldError.message as string}
                </ErrorSummary.Item>
              );
            }
            return null;
          });
        }
        return null;
      });
    }

    return Object.entries(error || {}).map(([key, err]) => {
      if (Array.isArray(err)) {
        return err.map((arrayErr, index) => {
          return Object.entries(arrayErr).map(([field, fieldError]) => {
            if (
              fieldError &&
              typeof fieldError === 'object' &&
              'message' in fieldError
            ) {
              return (
                <ErrorSummary.Item key={`${key}-${index}-${field}`}>
                  {fieldError.message as string}
                </ErrorSummary.Item>
              );
            }
            return null;
          });
        });
      }

      if (typeof err === 'object' && 'message' in err) {
        return (
          <ErrorSummary.Item key={key}>
            {err.message as string}
          </ErrorSummary.Item>
        );
      }
      return null;
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-8'>
        <Heading level='2' size='large'>
          Publisering
        </Heading>
        <BodyShort spacing>
          Velg når, og hvor stillingen skal publiseres.
        </BodyShort>
        <div className='mb-4 flex gap-4'>
          <DatoVelger
            key='publiseres'
            valgtDato={watch('innspurt.publiseres')}
            label='Publiseres'
            setDato={(val) =>
              val ? setValue('innspurt.publiseres', val) : null
            }
          />
          <DatoVelger
            key='avsluttes'
            label='Siste visning'
            valgtDato={watch('innspurt.avsluttes')}
            setDato={(val) =>
              val ? setValue('innspurt.avsluttes', val) : null
            }
          />
        </div>
        <div className='pt-8'>
          <Label>
            Skal stillingen publiseres på arbeidsplassen.no også? (valgfritt)
          </Label>
          <Checkbox
            checked={
              watch('innspurt.stillingType') === StillingSynlighet.EKSTERN
            }
            onChange={(e) => {
              setValue(
                'innspurt.stillingType',
                e.target.checked
                  ? StillingSynlighet.EKSTERN
                  : StillingSynlighet.INTERN,
              );
            }}
          >
            Ja, publiser stillingen offentlig på arbeidsplassen.no
          </Checkbox>
        </div>

        <div>
          <CheckboxGroup
            legend={`Hvordan sende søknad? ${watch('innspurt.stillingType') !== StillingSynlighet.EKSTERN ? '(valgfritt)' : ''}`}
            onChange={handleChange}
          >
            <Checkbox value='epost'>E-post</Checkbox>
            {sendeSoknad.includes('epost') && (
              <Controller
                name='innspurt.epost'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='E-post'
                    type='email'
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            )}
            <Checkbox value='lenke'>Lenke til søknadsskjema</Checkbox>
            {sendeSoknad.includes('lenke') && (
              <Controller
                name='innspurt.lenke'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='Lenke til søknadsskjema'
                    type='url'
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            )}
          </CheckboxGroup>
          {errors?.innspurt?.epost && (
            <ErrorMessage>{errors.innspurt?.epost?.message}</ErrorMessage>
          )}
        </div>

        <div>
          <Heading level='3' size='small' spacing>
            Hva skjer når du publiserer?
          </Heading>
          <ul className='list-disc space-y-2 pl-8'>
            <li>
              Annonsen blir synlig for
              <ul className='mt-2 list-disc space-y-2 pl-8'>
                <li>Nav-ansatte i stillingssøket i rekrutteringsbistand​.</li>
                <li>
                  Ansatte hos arbeidsgiveren på Min Side Arbeidsgiver på nav.no
                  med Altinn-tilgang.
                </li>
                <li>Nav brukere som får stillingen delt i aktivitetsplanen.</li>
              </ul>
            </li>
            <li>Du kan når som helst endre eller avpublisere annonsen.</li>
          </ul>
        </div>
        {errors && (
          <OppsummerValidering
            genererHref={(id) => {
              const root = id.split('.')[0];
              const steg = STEG_MAP[root];
              return steg ? `?steg=${steg}#${id}` : `#${id}`;
            }}
          />
        )}

        <div className='mb-8 flex w-full justify-between pt-8'>
          {stegNummer > 1 ? (
            <Button
              variant='tertiary'
              onClick={forrigeSteg}
              icon={<ArrowLeftIcon />}
              iconPosition='left'
            >
              Forrige steg
            </Button>
          ) : (
            <div />
          )}
          <Button
            disabled={errors && Object.keys(errors).length > 0}
            icon={<CheckmarkCircleIcon />}
            type='submit'
            loading={isLoading}
          >
            Fullfør og publiser
          </Button>
        </div>
      </div>
    </form>
  );
};
