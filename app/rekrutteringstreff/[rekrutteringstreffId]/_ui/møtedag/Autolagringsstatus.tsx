import {
  ExclamationmarkTriangleIcon,
  FloppydiskIcon,
} from '@navikt/aksel-icons';
import { Loader } from '@navikt/ds-react';

interface Props {
  lagrer: boolean;
  feil: boolean;
  kunngjøring?: string | null;
}

const Autolagringsstatus = ({ lagrer, feil, kunngjøring }: Props) => {
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
    ? kunngjøring || 'Kunne ikke lagre alle endringene.'
    : lagrer
      ? 'Lagrer endringer.'
      : kunngjøring || 'Alle endringer er lagret.';

  return (
    <span
      role='status'
      // Datovelgerens månedsetikett er også en `status`, så testene trenger et
      // eget holdepunkt for autolagringa. Et aria-label ville overstyrt
      // kunngjøringa under.
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
