import type { RomDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { sammenlignDeltakernummer } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/deltakernavn';

export const flyttJobbsøkerTilRom = (
  rom: RomDTO[],
  personTreffId: string,
  målromnummer: number,
  hentDeltakernummer?: (personTreffId: string) => number | undefined,
): RomDTO[] => {
  const kilderom = rom.find(({ jobbsøkere }) =>
    jobbsøkere.includes(personTreffId),
  );
  const målromFinnes = rom.some(({ romnummer }) => romnummer === målromnummer);

  if (!kilderom || !målromFinnes || kilderom.romnummer === målromnummer) {
    return rom;
  }

  const sorterMålrom = (jobbsøkere: string[]): string[] => {
    if (!hentDeltakernummer) return jobbsøkere;
    return [...jobbsøkere].sort((a, b) =>
      sammenlignDeltakernummer(hentDeltakernummer(a), hentDeltakernummer(b)),
    );
  };
  return rom.map((aktueltRom) => ({
    ...aktueltRom,
    jobbsøkere:
      aktueltRom.romnummer === målromnummer
        ? sorterMålrom([
            ...aktueltRom.jobbsøkere.filter((id) => id !== personTreffId),
            personTreffId,
          ])
        : aktueltRom.jobbsøkere.filter((id) => id !== personTreffId),
  }));
};
