import navkontorer from '@/components/layout/modiadekoratør/enheter.json';

export const finnNavkontor = (enhetId: string | undefined | null) =>
  navkontorer.find((kontor) => kontor.enhetId === enhetId);

export const hentNavkontorNavn = (enhetId: string | undefined | null) => {
  const kontor = finnNavkontor(enhetId);
  return kontor ? kontor.navn : 'Udefinert Nav-kontor';
};
