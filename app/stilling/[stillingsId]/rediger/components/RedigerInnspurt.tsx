import { ArrowLeftIcon, CheckmarkCircleIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Button,
  Checkbox,
  CheckboxGroup,
  ErrorSummary,
  Heading,
  Radio,
  RadioGroup,
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
import { oppdaterStilling } from '../../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { useStillingsContext } from '../../StillingsContext';
import { mapFormTilStilling } from '../mapStilling';
import { StillingsDataForm } from '../redigerFormType.zod';
import { DatoVelger } from './DatoVelger';

export const RedigerInnspurt: React.FC<{
  stegNummer: number;
  forrigeSteg: () => void;
}> = ({ stegNummer, forrigeSteg }) => {
  const { stillingsData, refetch } = useStillingsContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [sendeSoknad, setSendeSoknad] = useState<string[]>([]);

  const handleChange = (val: string[]) => setSendeSoknad(val);

  const {
    getValues,
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

    const response = await oppdaterStilling(publiserStillingsData);

    if (response.stilling.uuid) {
      refetch();
      router.push(`/stilling/${response.stilling.uuid}`);
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
        <div className='flex gap-4 mb-4'>
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
        <RadioGroup
          legend='Skal stillingen publiseres på arbeidsplassen.no også?'
          value={watch('innspurt.stillingType')}
          onChange={(val) => setValue('innspurt.stillingType', val)}
        >
          <Radio value='DIR'>Nei, den vises kun internt</Radio>
          <Radio value='SHOW_ALL'>
            Ja, publiser stillingen offentlig på arbeidsplassen.no
          </Radio>
        </RadioGroup>

        {watch('innspurt.stillingType') === 'SHOW_ALL' && (
          <div>
            <CheckboxGroup
              legend='Hvordan sende søknad?'
              onChange={handleChange}
            >
              <Checkbox value='epost'>E-post</Checkbox>
              {sendeSoknad.includes('epost') && (
                <Controller
                  name='innspurt.epost'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      label='E-post'
                      type='email'
                      error={error?.message}
                    />
                  )}
                />
              )}
              <Checkbox value='lenke'>Lenke til søknadsskjema</Checkbox>
              {sendeSoknad.includes('lenke') && (
                <Controller
                  name='innspurt.lenke'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      label='Lenke til søknadsskjema'
                      type='url'
                      error={error?.message}
                    />
                  )}
                />
              )}
            </CheckboxGroup>
          </div>
        )}

        <div>
          <Heading level='3' size='small' spacing>
            Hva skjer når du publiserer?
          </Heading>
          <ul className='list-disc pl-8 space-y-2'>
            <li>
              Annonsen blir synlig for
              <ul className='list-disc pl-8 space-y-2 mt-2'>
                <li>Nav-ansatte i stillingssøket​.</li>
                <li>Kandidater som får annonsen delt til aktivitetsplanen</li>
                <li>Personer som får tilsendt link til stillingsannonsen</li>
              </ul>
            </li>
            <li>Du kan når som helst endre eller avpublisere annonsen</li>
          </ul>
        </div>

        {errors && Object.keys(errors).length > 0 && (
          <ErrorSummary>
            {errors.omVirksomheten && (
              <>
                <Heading size='small'>Om virksomheten</Heading>
                {mapError(errors.omVirksomheten)}
              </>
            )}
            {errors.omTilrettelegging && (
              <>
                <Heading size='small'>Om tilrettelegging</Heading>
                {mapError(errors.omTilrettelegging)}
              </>
            )}
            {errors.omStillingen && (
              <>
                <Heading size='small'>Om stillingen</Heading>
                {mapError(errors.omStillingen)}
              </>
            )}
            {errors.praktiskInfo && (
              <>
                <Heading size='small'>Praktisk info</Heading>
                {mapError(errors.praktiskInfo)}
              </>
            )}
            {errors.innspurt && (
              <>
                <Heading size='small'>Innspurt</Heading>
                {mapError(errors.innspurt)}
              </>
            )}
          </ErrorSummary>
        )}
        <div className='flex justify-between mb-8 pt-8 w-full'>
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
