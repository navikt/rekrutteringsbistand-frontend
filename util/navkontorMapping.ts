import navkontorer from '@/components/layout/modiadekoratør/enheter.json';

export const hentNavkontorNavn = (enhetId: string) => {
  return navkontorer.find((kontor) => kontor.enhetId === enhetId)?.navn;
};
