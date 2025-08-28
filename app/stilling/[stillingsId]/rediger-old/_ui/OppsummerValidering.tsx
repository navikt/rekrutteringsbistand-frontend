import { FormidlingDataForm } from '@/app/etterregistrering/ny-etterregistrering/redigerFormidlingFormType';
import { StillingsDataForm } from '@/app/stilling/[stillingsId]/rediger-old/redigerFormType.zod';
import { ErrorSummary } from '@navikt/ds-react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

export interface OppsummerValideringProps {
  feltNavn?:
    | 'omVirksomheten'
    | 'omTilrettelegging'
    | 'omStillingen'
    | 'praktiskInfo'
    | 'omFormidlingen';
  /**
   * Funksjon for å lage custom href per feil-id (path joinet med '.')
   * Returner f.eks. `?steg=praktisk-info#${id}`
   */
  genererHref?: (id: string) => string;
}

const hentIssues = (
  errorObj: any,
  path: (string | number)[] = [],
): { path: (string | number)[]; message: string }[] => {
  if (!errorObj) return [];
  const issues: { path: (string | number)[]; message: string }[] = [];

  if (typeof errorObj.message === 'string' && errorObj.message) {
    issues.push({ path, message: errorObj.message });
  }

  if (Array.isArray(errorObj)) {
    errorObj.forEach((child, idx) => {
      issues.push(...hentIssues(child, [...path, idx]));
    });
    return issues;
  }

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
  genererHref,
}) => {
  const {
    formState: { errors },
  } = useFormContext<StillingsDataForm | FormidlingDataForm>();

  let issues: { path: (string | number)[]; message: string }[] = [];

  if (feltNavn) {
    const feilNode = (errors as Record<string, any>)[feltNavn];
    if (!feilNode) return null;
    issues = hentIssues(feilNode, [feltNavn]);
  } else {
    issues = hentIssues(errors);
  }

  if (issues.length === 0) return null;

  return (
    <div className='my-8'>
      <ErrorSummary>
        {issues.map((issue) => {
          const id = issue.path.map(String).join('.');

          // Bygg href (for skjermleser / fallback)
          const href = id
            ? genererHref
              ? genererHref(id)
              : `#${id}`
            : undefined;

          const onClick = (e: React.MouseEvent) => {
            if (!id || !href) return;
            e.preventDefault();

            // Normaliser til full URL for replaceState (unngå Next.js rerender)
            const path = window.location.pathname;

            let newUrl: string;
            if (href.startsWith('?')) {
              newUrl = `${path}${href}`;
            } else if (href.startsWith('#')) {
              newUrl = `${path}${window.location.search}${href}`;
            } else if (href.startsWith('/')) {
              // Hvis noen sender inn absolutt path til annen side lar vi vanlig navigasjon skje
              window.location.href = href;
              return;
            } else {
              // Antar hash uten prefiks
              newUrl = `${path}${window.location.search}#${href}`;
            }

            window.history.replaceState(null, '', newUrl);

            // Scroll og fokus
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              if (!el.hasAttribute('tabindex')) {
                el.setAttribute('tabindex', '-1');
              }
              (el as HTMLElement).focus({ preventScroll: true });
            }
          };

          return (
            <ErrorSummary.Item key={id} href={href} onClick={onClick}>
              {issue.message}
            </ErrorSummary.Item>
          );
        })}
      </ErrorSummary>
    </div>
  );
};

export default OppsummerValidering;
