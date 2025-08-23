import { getMiljø, Miljø } from '@/util/miljø';

export const arbeidsrettetOppfølgingUrl =
  getMiljø() === Miljø.ProdGcp
    ? 'https://veilarbpersonflate.intern.nav.no'
    : 'https://veilarbpersonflate.intern.dev.nav.no';

export const dialogUrl = `${arbeidsrettetOppfølgingUrl}/#visDialog`;
