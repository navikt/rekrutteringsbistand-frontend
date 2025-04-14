import { StillingsDataForm } from '../redigerFormType.zod';
import { ErrorSummary } from '@navikt/ds-react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

export interface OppsummerValideringProps {
  feltNavn:
    | 'omVirksomheten'
    | 'omTilrettelegging'
    | 'omStillingen'
    | 'praktiskInfo';
}

const hentErrorMelding = (errorObj: any): string[] => {
  if (!errorObj) return [];

  let messages: string[] = [];

  if (errorObj.message) {
    messages.push(errorObj.message);
  }

  if (Array.isArray(errorObj)) {
    errorObj.forEach((item) => {
      const nestedMessages = hentErrorMelding(item);
      nestedMessages.forEach((msg) => {
        messages.push(msg);
      });
    });
  } else if (typeof errorObj === 'object') {
    Object.keys(errorObj).forEach((key) => {
      if (key !== 'type' && key !== 'ref' && key !== 'message') {
        const nestedMessages = hentErrorMelding(errorObj[key]);
        messages = messages.concat(nestedMessages);
      }
    });
  }

  return messages;
};

const OppsummerValidering: React.FC<OppsummerValideringProps> = ({
  feltNavn,
}) => {
  const {
    formState: { errors },
  } = useFormContext<StillingsDataForm>();

  const feilMeldinger = errors[feltNavn];

  if (!feltNavn || !feilMeldinger) {
    return null;
  }

  const mapFeilmeldinger = hentErrorMelding(feilMeldinger);

  return (
    <div className='my-8'>
      <ErrorSummary>
        {mapFeilmeldinger.map((feilmelding, index) => (
          <ErrorSummary.Item key={index}>{feilmelding}</ErrorSummary.Item>
        ))}
      </ErrorSummary>
    </div>
  );
};

export default OppsummerValidering;
