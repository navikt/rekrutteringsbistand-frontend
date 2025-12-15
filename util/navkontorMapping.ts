import navkontorer from '@/components/layout/modiadekoratør/enheter.json';

export const hentNavkontorNavn = (enhetId: string) => {
  const kontor = navkontorer.find((kontor) => kontor.enhetId === enhetId);
  return kontor ? kontor.navn : 'Udefinert Nav-kontor';
};
