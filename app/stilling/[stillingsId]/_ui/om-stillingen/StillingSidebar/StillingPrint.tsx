import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useUmami } from '@/providers/UmamiContext';
import { PrinterSmallIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';
import { useReactToPrint } from 'react-to-print';

export interface StillingPrintProps {
  printRef: React.RefObject<HTMLDivElement | null>;
}

const StillingPrint: React.FC<StillingPrintProps> = ({ printRef }) => {
  const { stillingsData } = useStillingsContext();
  const { track } = useUmami();

  const reactToPrintFn = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${stillingsData?.stilling?.title ?? 'Stilling'}`,
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

  React.useEffect(() => {
    const currentRef = printRef.current;
    if (currentRef) {
      currentRef.classList.add('print-content');
    }

    return () => {
      if (currentRef) {
        const printTitle = currentRef.querySelector('.print-only');
        if (printTitle) {
          printTitle.remove();
        }
        currentRef.classList.remove('print-content');
      }
    };
  }, [printRef, stillingsData]);
  if (!printRef.current) {
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
