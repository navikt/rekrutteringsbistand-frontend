import type { Treffgjennomføringsregistreringer } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/registreringer';

const entallEllerFlertall = (
  antall: number,
  entall: string,
  flertall: string,
) => `${antall} ${antall === 1 ? entall : flertall}`;

export const beskrivRegistreringer = (
  registreringer: Treffgjennomføringsregistreringer,
): string[] => {
  const punkter: string[] = [];
  if (registreringer.interesser > 0) {
    punkter.push(
      `${entallEllerFlertall(
        registreringer.interesser,
        'registrert interesse',
        'registrerte interesser',
      )} (steg 3)`,
    );
  }
  if (registreringer.intervjufordelinger > 0) {
    punkter.push(
      `${entallEllerFlertall(
        registreringer.intervjufordelinger,
        'registrert intervjufordeling',
        'registrerte intervjufordelinger',
      )} (steg 4)`,
    );
  }
  if (registreringer.vurderinger > 0) {
    punkter.push(
      `${entallEllerFlertall(
        registreringer.vurderinger,
        'registrert status',
        'registrerte statuser',
      )} (steg 5)`,
    );
  }
  return punkter;
};
