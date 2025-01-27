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
    const currentRef = printRef.current;
    if (currentRef) {
      const printTitle = document.createElement('h1');
      printTitle.innerText = stillingsData.stilling.title ?? '';
      printTitle.className = 'print-only';
      printTitle.style.display = 'none';
      printTitle.style.textAlign = 'center';
      printTitle.style.marginBottom = '20px';
      printTitle.style.padding = '10px';
      printTitle.style.borderBottom = '1px solid #000';

      currentRef.prepend(printTitle);
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
