import { hentDokumentstiler } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/utskriftsstiler';
import { RefObject } from 'react';
import { useReactToPrint } from 'react-to-print';

// Nødvendige utskriftsregler som ellers hadde ligget i react-to-print sin
// standardstil. Uten dem faller bakgrunnsfarger bort i utskrifta.
const GRUNNSTIL = `
@media print {
  body {
    color-adjust: exact;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
}
`;

export const useWorkOpUtskrift = ({
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
    // react-to-print kopierer normalt <link>-stilarka inn i utskriftsiframen og
    // venter på at hvert av dem melder fra at det er lastet. Ventinga har ingen
    // tidsgrense, så et stilark som aldri melder fra, låser utskrifta. Vi tar
    // derfor med stilene som tekst, slik at utskrifta starter umiddelbart.
    ignoreGlobalStyles: true,
    pageStyle: `${hentDokumentstiler()}\n${GRUNNSTIL}\n${sidestil}`,
  });
