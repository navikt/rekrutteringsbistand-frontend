import { PrinterSmallIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';
import { useReactToPrint } from 'react-to-print';
import { useStillingsContext } from '../../StillingsContext';

export interface StillingPrintProps {
  printRef: React.RefObject<HTMLDivElement>;
}

const StillingPrint: React.FC<StillingPrintProps> = ({ printRef }) => {
  const { stillingsData } = useStillingsContext();

  const reactToPrintFn = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${stillingsData?.stilling?.title ?? 'Stilling'}`,
    pageStyle: `
      @media print {
        .print-only {
          display: block !important;
        }
        .print-content {
          padding: 20px !important;
        }
      }
    `,
  });

  React.useEffect(() => {
    if (printRef.current) {
      const printTitle = document.createElement('h1');
      printTitle.innerText = stillingsData.stilling.title ?? '';
      printTitle.className = 'print-only';
      printTitle.style.display = 'none';
      printTitle.style.textAlign = 'center';
      printTitle.style.marginBottom = '20px';
      printTitle.style.padding = '10px';
      printTitle.style.borderBottom = '1px solid #000';

      printRef.current.prepend(printTitle);
      printRef.current.classList.add('print-content');
    }

    return () => {
      if (printRef.current) {
        const printTitle = printRef.current.querySelector('.print-only');
        if (printTitle) {
          printTitle.remove();
        }
        printRef.current.classList.remove('print-content');
      }
    };
  }, [printRef]);

  return (
    <Button
      variant='secondary'
      size='small'
      className='w-full h-5'
      icon={<PrinterSmallIcon />}
      onClick={() => reactToPrintFn()}
    >
      Skriv ut
    </Button>
  );
};

export default StillingPrint;
