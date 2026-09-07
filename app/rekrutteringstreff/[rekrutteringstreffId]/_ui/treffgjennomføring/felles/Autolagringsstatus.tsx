import {
  ExclamationmarkTriangleIcon,
  FloppydiskIcon,
} from '@navikt/aksel-icons';
import { Loader } from '@navikt/ds-react';

interface Props {
  lagrer: boolean;
  feil: boolean;
  statusmelding?: string | null;
}

const Autolagringsstatus = ({ lagrer, feil, statusmelding }: Props) => {
  const visuellStatus = feil ? (
    <>
      <ExclamationmarkTriangleIcon aria-hidden />
      Lagringsfeil
    </>
  ) : lagrer ? (
    <>
      <Loader size='xsmall' title='Lagrer' />
      Lagrer …
    </>
  ) : (
    <>
      <FloppydiskIcon aria-hidden />
      Lagret
    </>
  );
  const tilgjengeligStatus = feil
    ? statusmelding || 'Kunne ikke lagre alle endringene.'
    : lagrer
      ? 'Lagrer endringer.'
      : statusmelding || 'Alle endringer er lagret.';

  return (
    <span
      role='status'
      data-autolagringsstatus
      aria-live='polite'
      aria-atomic='true'
      className='text-ax-text-neutral-subtle inline-flex h-8 w-32 shrink-0 items-center justify-end text-xs'
    >
      <span aria-hidden className='inline-flex items-center gap-2'>
        {visuellStatus}
      </span>
      <span className='sr-only'>{tilgjengeligStatus}</span>
    </span>
  );
};

export default Autolagringsstatus;
