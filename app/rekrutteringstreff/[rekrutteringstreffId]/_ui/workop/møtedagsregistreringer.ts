import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';

export interface Møtedagsregistreringer {
  ønsker: number;
  intervjuplasser: number;
  vurderinger: number;
}

export const tellRegistreringer = (
  møtedag: MøtedagDTO | undefined,
  personTreffId: string,
): Møtedagsregistreringer => {
  if (!møtedag) {
    return { ønsker: 0, intervjuplasser: 0, vurderinger: 0 };
  }

  const ønsker = møtedag.ønsker.filter(
    (ønske) => ønske.personTreffId === personTreffId,
  ).length;

  const intervjuplasser = møtedag.intervjufordelinger.filter(
    (fordeling) =>
      fordeling.inkludertePersonTreffIder.includes(personTreffId) ||
      fordeling.ekskludertePersonTreffIder.includes(personTreffId),
  ).length;

  const vurderinger = møtedag.vurderinger.filter(
    (vurdering) =>
      vurdering.personTreffId === personTreffId &&
      (vurdering.vurdering !== null ||
        vurdering.andreIntervju ||
        vurdering.jobbtilbud),
  ).length;

  return { ønsker, intervjuplasser, vurderinger };
};

export const harRegistreringer = (
  registreringer: Møtedagsregistreringer,
): boolean =>
  registreringer.ønsker +
    registreringer.intervjuplasser +
    registreringer.vurderinger >
  0;

const entallEllerFlertall = (
  antall: number,
  entall: string,
  flertall: string,
) => `${antall} ${antall === 1 ? entall : flertall}`;

export const beskrivRegistreringer = (
  registreringer: Møtedagsregistreringer,
): string[] => {
  const punkter: string[] = [];
  if (registreringer.ønsker > 0) {
    punkter.push(
      entallEllerFlertall(
        registreringer.ønsker,
        'ønsket arbeidsgiver',
        'ønskede arbeidsgivere',
      ),
    );
  }
  if (registreringer.intervjuplasser > 0) {
    punkter.push(
      entallEllerFlertall(
        registreringer.intervjuplasser,
        'plass i intervjufordelingen',
        'plasser i intervjufordelingen',
      ),
    );
  }
  if (registreringer.vurderinger > 0) {
    punkter.push(
      entallEllerFlertall(
        registreringer.vurderinger,
        'vurdering etter speedintervju',
        'vurderinger etter speedintervju',
      ),
    );
  }
  return punkter;
};
