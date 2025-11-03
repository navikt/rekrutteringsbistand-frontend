import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import { PrinterSmallIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { RefObject, useEffect, useState, type FC } from 'react';
import { useReactToPrint } from 'react-to-print';

export interface StillingPrintProps {
  printRef: RefObject<HTMLDivElement | null>;
}

const StillingPrint: FC<StillingPrintProps> = ({ printRef }) => {
  const { stillingsData } = useStillingsContext();
  const { track } = useUmami();
  // Vi bruker en egen state som settes asynkront (via rAF) for å unngå lint-feil om synkron setState i effect
  const [isReady, setIsReady] = useState(false);

  const reactToPrintFn = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${stillingsData?.stilling?.title ?? 'Stilling'}`,
    onBeforePrint: async () => {
      const currentRef = printRef.current;
      if (currentRef && stillingsData?.stilling?.title) {
        // Fjern eksisterende tittel hvis den finnes
        const existingTitle = currentRef.querySelector('.print-title');
        if (existingTitle) {
          existingTitle.remove();
        }

        // Opprett ny tittel
        const titleElement = document.createElement('h1');
        titleElement.className = 'print-title print-only';
        titleElement.textContent = stillingsData.stilling.title;
        titleElement.style.cssText = `
          display: none;
          margin: 0 0 20px 0;
          padding: 0;
          font-size: 24px;
          font-weight: bold;
          color: #000;
        `;

        // Legg til øverst i innholdet
        currentRef.insertBefore(titleElement, currentRef.firstChild);
      }
    },
    pageStyle: `
        @media print {
          .print-only {
            display: block !important;
            text-align: left !important;
            margin-bottom: 20px !important;
            padding: 10px 0 !important;
            border-bottom: 1px solid #000 !important;
            font-size: 24px !important;
            font-weight: bold !important;
          }
          .print-content {
            padding: 20px !important;
          }
        }
      `,
  });

  useEffect(() => {
    let frame: number | null = null;
    const currentRef = printRef.current;
    if (currentRef) {
      currentRef.classList.add('print-content');
      // Utsett setState til neste frame for å unngå lint varsling om synkron setState
      frame = requestAnimationFrame(() => setIsReady(true));
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (currentRef) {
        const printTitle = currentRef.querySelector('.print-only');
        if (printTitle) {
          printTitle.remove();
        }
        currentRef.classList.remove('print-content');
      }
    };
  }, [printRef]);

  // Vent med å rendre knapp til ref er etablert
  if (!isReady) {
    return null;
  }

  return (
    <Button
      variant='tertiary'
      size='small'
      icon={<PrinterSmallIcon />}
      onClick={() => {
        reactToPrintFn();
        track(UmamiEvent.Stilling.skriv_ut_stilling);
      }}
    >
      Skriv ut
    </Button>
  );
};

export default StillingPrint;
