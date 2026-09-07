import type { RomDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';

export const flyttJobbsøkerTilRom = (
  rom: RomDTO[],
  personTreffId: string,
  målromnummer: number,
): RomDTO[] => {
  const kilderom = rom.find(({ jobbsøkere }) =>
    jobbsøkere.includes(personTreffId),
  );
  const målromFinnes = rom.some(({ romnummer }) => romnummer === målromnummer);

  if (!kilderom || !målromFinnes || kilderom.romnummer === målromnummer) {
    return rom;
  }

  return rom.map((aktueltRom) => ({
    ...aktueltRom,
    jobbsøkere:
      aktueltRom.romnummer === målromnummer
        ? [
            ...aktueltRom.jobbsøkere.filter((id) => id !== personTreffId),
            personTreffId,
          ]
        : aktueltRom.jobbsøkere.filter((id) => id !== personTreffId),
  }));
};
