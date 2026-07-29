import {
  harRegistreringer,
  tellRegistreringer,
  type Møtedagsregistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/møtedagHjelpere';

export { harRegistreringer, tellRegistreringer, type Møtedagsregistreringer };

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
