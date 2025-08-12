import { FormidlingDataForm } from '../../../../etterregistrering/ny-etterregistrering/redigerFormidlingFormType';
import { StillingsDataForm } from '../redigerFormType.zod';
import { ErrorSummary } from '@navikt/ds-react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

export interface OppsummerValideringProps {
  feltNavn:
    | 'omVirksomheten'
    | 'omTilrettelegging'
    | 'omStillingen'
    | 'praktiskInfo'
    | 'omFormidlingen';
}

const hentIssues = (
  errorObj: any,
  path: (string | number)[] = [],
): { path: (string | number)[]; message: string }[] => {
  if (!errorObj) return [];

  const issues: { path: (string | number)[]; message: string }[] = [];

  // RHF error node har message => registrer et issue
  if (typeof errorObj.message === 'string' && errorObj.message) {
    issues.push({ path, message: errorObj.message });
  }

  // Array: gå videre med indeks
  if (Array.isArray(errorObj)) {
    errorObj.forEach((child, idx) => {
      issues.push(...hentIssues(child, [...path, idx]));
    });
    return issues;
  }

  // Objekt: gå videre på keys
  if (typeof errorObj === 'object') {
    Object.keys(errorObj)
      .filter((k) => !['type', 'ref', 'message'].includes(k))
      .forEach((key) => {
        issues.push(...hentIssues(errorObj[key], [...path, key]));
      });
  }

  return issues;
};

const OppsummerValidering: React.FC<OppsummerValideringProps> = ({
  feltNavn,
}) => {
  const {
    formState: { errors },
  } = useFormContext<StillingsDataForm | FormidlingDataForm>();

  const feilNode = (errors as Record<string, any>)[feltNavn];
  if (!feilNode) return null;

  const issues = hentIssues(feilNode, [feltNavn]);

  return (
    <div className='my-8'>
      <ErrorSummary>
        {issues.map((issue) => {
          const id = issue.path.map(String).join('.');
          return (
            <ErrorSummary.Item key={id} href={`#${id}`}>
              {issue.message}
            </ErrorSummary.Item>
          );
        })}
      </ErrorSummary>
    </div>
  );
};

export default OppsummerValidering;
