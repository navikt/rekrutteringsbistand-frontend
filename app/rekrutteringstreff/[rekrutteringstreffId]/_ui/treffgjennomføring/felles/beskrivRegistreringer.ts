import type { Treffgjennomføringsregistreringer } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/registreringer';

const entallEllerFlertall = (
  antall: number,
  entall: string,
  flertall: string,
) => `${antall} ${antall === 1 ? entall : flertall}`;

/** Ordene følger stegnavnene, så brukeren finner steget der registreringen kan fjernes. */
export const beskrivRegistreringer = (
  registreringer: Treffgjennomføringsregistreringer,
): string[] => {
  const punkter: string[] = [];
  if (registreringer.interesser > 0) {
    punkter.push(
      entallEllerFlertall(
        registreringer.interesser,
        'registrert interesse',
        'registrerte interesser',
      ),
    );
  }
  if (registreringer.intervjufordelinger > 0) {
    punkter.push(
      entallEllerFlertall(
        registreringer.intervjufordelinger,
        'registrert intervjufordeling',
        'registrerte intervjufordelinger',
      ),
    );
  }
  if (registreringer.vurderinger > 0) {
    punkter.push(
      entallEllerFlertall(
        registreringer.vurderinger,
        'registrert vurdering',
        'registrerte vurderinger',
      ),
    );
  }
  return punkter;
};
