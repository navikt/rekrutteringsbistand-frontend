import { ArrowLeftIcon, CheckmarkCircleIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Button,
  ErrorSummary,
  Heading,
  Radio,
  RadioGroup,
} from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldErrors, SubmitHandler, useFormContext } from 'react-hook-form';
import { oppdaterStilling } from '../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { useStillingsContext } from '../StillingsContext';
import { DatoVelger } from './components/DatoVelger';
import {
  StillingsDataForm,
  StillingsDataFormSchema,
} from './redigerFormType.zod';
import { mapFormTilStilling } from './redigerUtil';

export const RedigerInnspurt: React.FC<{
  stegNummer: number;
  forrigeSteg: () => void;
}> = ({ stegNummer, forrigeSteg }) => {
  const { stillingsData } = useStillingsContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormContext<StillingsDataForm>();

  const onSubmit: SubmitHandler<StillingsDataForm> = async (data) => {
    setIsLoading(true);

    const validerData = StillingsDataFormSchema.safeParse(data);
    if (!validerData.success) {
      const nyStillingsData = mapFormTilStilling(data, stillingsData);

      const response = await oppdaterStilling(nyStillingsData);

      if (response.stilling.uuid) {
        router.push(`/stilling/${response.stilling.uuid}`);
      } else {
        alert('Feil ved opprettelse av stilling');
      }
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
          Innspurt
        </Heading>
        <BodyShort spacing>
          Velg når, og hvor stillingen skal publiseres.
        </BodyShort>
        <div className='flex gap-4 mb-4'>
          <DatoVelger
            fraDato={watch('innspurt.publiseres') ?? undefined}
            label='Publiseres'
            setDato={(val) => console.log(val)}
          />
          <DatoVelger
            label='Avsluttes og skjules'
            fraDato={watch('innspurt.avsluttes') ?? undefined}
            setDato={(val) => console.log(val)}
          />
        </div>
        <RadioGroup
          legend='Hvor skal stillingen publiseres?'
          value={watch('innspurt.stillingType')}
          onChange={(val) => setValue('innspurt.stillingType', val)}
        >
          <Radio value='DIR'>NAV (Intern)</Radio>
          <Radio value='SHOW_ALL'>arbeidsplassen.no (Ekstern)</Radio>
        </RadioGroup>
        <div>
          <Heading size='medium'>Hva skjer når du publiserer?</Heading>
          <ul className='list-disc pl-6 mt-2 space-y-2'>
            <li>
              Annonsen blir synlig for
              <ul className='list-disc pl-4'>
                <li>
                  Nav-ansatte i stillingssøket fra fredag 11. februar 2023.
                </li>
                <li>
                  ansatte hos arbeidsgiveren på Min Side Arbeidsgiver på nav.no
                  med Altinn-tilgangen “rekruttering”.
                </li>
                <li>Nav-brukere som får annonsen delt i aktivitetsplanen.</li>
              </ul>
            </li>
            <li>Du kan når som helst kan endre eller avpublisere annonsen.</li>
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
        <div className='flex justify-between mb-8 mt-4 w-full'>
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
