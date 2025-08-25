'use client';

import { useWindows } from './WindowWrapper';
import VisKandidat from '@/app/kandidat/vis-kandidat/VisKandidat';
import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
import StillingsSide from '@/app/stilling/[stillingsId]/StillingsSide';
import StillingSideLayout from '@/app/stilling/[stillingsId]/StillingssideLayout';
import { XMarkIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import { useEffect, useRef } from 'react';

/**
 * WindowController
 * Lytter på query-parametre (?visKandidatnr= & ?visStillingId=) og åpner/lukker vinduer dynamisk i WindowWrapper.
 * Når brukeren lukker vinduet fjernes tilsvarende query-param.
 *
 * Antakelser:
 *  - Param-navn er "visKandidat" og "visStilling" (bruker forespørsel). Eksisterende kode bruker "visKandidatnr"; endre enkelt her hvis ønskelig.
 *  - Verdien i param er en id / nøkkel som kan brukes av komponentene. Her vises en enkel placeholder.
 */

interface WindowControllerProps {
  /** Custom renderer for kandidat-vindu (får verdien fra ?visKandidatnr= ) */
  renderKandidat?: (
    kandidatnr: string,
    close: () => void,
  ) => React.ReactElement;
  /** Custom renderer for stilling-vindu (får verdien fra ?visStillingId= ) */
  renderStilling?: (
    stillingId: string,
    close: () => void,
  ) => React.ReactElement;
  /** Plassering når vindu først åpnes (default below = under tidligere) */
  kandidatPosition?: 'below' | 'above' | 'after';
  stillingPosition?: 'below' | 'above' | 'after';
}

const DefaultKandidat = ({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) => (
  <div>
    <header className='flex items-start justify-between gap-4'>
      <div />
      <Button
        variant='tertiary-neutral'
        size='xsmall'
        onClick={onClose}
        icon={<XMarkIcon aria-hidden />}
      >
        Lukk
      </Button>
    </header>
    <VisKandidat kandidatnr={id} />
  </div>
);

const DefaultStilling = ({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) => (
  <div className='flex h-full flex-col gap-2 p-4'>
    <header className='flex items-start justify-between gap-4'>
      <div />
      <Button
        variant='tertiary-neutral'
        size='xsmall'
        onClick={onClose}
        icon={<XMarkIcon aria-hidden />}
      />
    </header>
    <StillingsContextProvider stillingsId={id}>
      <StillingSideLayout>
        <StillingsSide />
      </StillingSideLayout>
    </StillingsContextProvider>
  </div>
);

const WindowController: React.FC<WindowControllerProps> = ({
  renderKandidat = (id, close) => <DefaultKandidat id={id} onClose={close} />,
  renderStilling = (id, close) => <DefaultStilling id={id} onClose={close} />,
  kandidatPosition = 'below',
  stillingPosition = 'below',
}) => {
  const { addWindow, updateWindow, removeWindow, listWindows } =
    useWindows() as any;

  // Query params (tom streng = ikke aktiv)
  const [visKandidatnr, setVisKandidatnr] = useQueryState('visKandidatnr', {
    defaultValue: '',
    clearOnDefault: true,
  });
  const [visStillingId, setVisStillingId] = useQueryState('visStillingId', {
    defaultValue: '',
    clearOnDefault: true,
  });

  // Ref for å huske vindu-id'er slik at vi kan lukke riktig
  const kandidatWindowIdRef = useRef<string | null>(null);
  const stillingWindowIdRef = useRef<string | null>(null);
  const lastKandidatValueRef = useRef<string | null>(null);
  const lastStillingValueRef = useRef<string | null>(null);

  // Håndter kandidat-vindu (åpne / oppdatere / lukke)
  useEffect(() => {
    // Invalider stale ref hvis vindu ble fjernet eksternt
    if (
      kandidatWindowIdRef.current &&
      !listWindows().includes(kandidatWindowIdRef.current)
    ) {
      kandidatWindowIdRef.current = null;
    }
    if (visKandidatnr) {
      const element = renderKandidat(visKandidatnr, () => setVisKandidatnr(''));
      if (!kandidatWindowIdRef.current) {
        const id = addWindow(element, { position: kandidatPosition });
        kandidatWindowIdRef.current = id;
        lastKandidatValueRef.current = visKandidatnr;
      } else if (lastKandidatValueRef.current !== visKandidatnr) {
        updateWindow(kandidatWindowIdRef.current, element);
        lastKandidatValueRef.current = visKandidatnr;
      }
    } else if (!visKandidatnr && kandidatWindowIdRef.current) {
      removeWindow(kandidatWindowIdRef.current);
      kandidatWindowIdRef.current = null;
      lastKandidatValueRef.current = null;
    }
  }, [
    visKandidatnr,
    addWindow,
    updateWindow,
    removeWindow,
    renderKandidat,
    kandidatPosition,
    setVisKandidatnr,
    listWindows,
  ]);

  // Håndter stilling-vindu (åpne / oppdatere / lukke)
  useEffect(() => {
    if (
      stillingWindowIdRef.current &&
      !listWindows().includes(stillingWindowIdRef.current)
    ) {
      stillingWindowIdRef.current = null;
    }
    if (visStillingId) {
      const element = renderStilling(visStillingId, () => setVisStillingId(''));
      if (!stillingWindowIdRef.current) {
        const id = addWindow(element, { position: stillingPosition });
        stillingWindowIdRef.current = id;
        lastStillingValueRef.current = visStillingId;
      } else if (lastStillingValueRef.current !== visStillingId) {
        updateWindow(stillingWindowIdRef.current, element);
        lastStillingValueRef.current = visStillingId;
      }
    } else if (!visStillingId && stillingWindowIdRef.current) {
      removeWindow(stillingWindowIdRef.current);
      stillingWindowIdRef.current = null;
      lastStillingValueRef.current = null;
    }
  }, [
    visStillingId,
    addWindow,
    updateWindow,
    removeWindow,
    renderStilling,
    stillingPosition,
    setVisStillingId,
    listWindows,
  ]);

  // Rydd opp ved unmount
  useEffect(() => {
    return () => {
      if (kandidatWindowIdRef.current)
        removeWindow(kandidatWindowIdRef.current);
      if (stillingWindowIdRef.current)
        removeWindow(stillingWindowIdRef.current);
    };
  }, [removeWindow]);

  return null; // Ingen visuell output – styrer kun vinduer
};

export default WindowController;
