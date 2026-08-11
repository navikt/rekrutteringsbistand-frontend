import { hentDokumentstiler } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/utskriftsstiler';
import { RefObject } from 'react';
import { useReactToPrint } from 'react-to-print';

const GRUNNSTIL = `
@media print {
  body {
    color-adjust: exact;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
}
`;

export const useUtskrift = ({
  utskriftsområdeRef,
  dokumenttittel,
  sidestil,
}: {
  utskriftsområdeRef: RefObject<HTMLDivElement | null>;
  dokumenttittel: string;
  sidestil: string;
}) =>
  useReactToPrint({
    contentRef: utskriftsområdeRef,
    documentTitle: dokumenttittel,
    ignoreGlobalStyles: true,
    pageStyle: `${hentDokumentstiler()}\n${GRUNNSTIL}\n${sidestil}`,
  });
