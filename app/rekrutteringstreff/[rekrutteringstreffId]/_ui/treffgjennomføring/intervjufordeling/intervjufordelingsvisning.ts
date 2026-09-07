import type { ArbeidsgiverIntervjufordelingDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import type { ArbeidsgiverMedId } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/arbeidsgivere';
import { finnPlasskonflikter } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/intervjufordeling/intervjurekkefølge';

export const lagIntervjufordelingsvisning = (
  arbeidsgivere: ArbeidsgiverMedId[],
  fordelinger: ArbeidsgiverIntervjufordelingDTO[],
) => {
  const arbeidsgiverePerId = new Map(
    arbeidsgivere.map((arbeidsgiver) => [
      arbeidsgiver.arbeidsgiverTreffId,
      arbeidsgiver,
    ]),
  );
  const fordelingPerArbeidsgiverId = new Map(
    fordelinger.map((fordeling) => [fordeling.arbeidsgiverTreffId, fordeling]),
  );
  const konflikter = finnPlasskonflikter(fordelinger);
  const kort = arbeidsgivere.flatMap((arbeidsgiver) => {
    const fordeling = fordelingPerArbeidsgiverId.get(
      arbeidsgiver.arbeidsgiverTreffId,
    );
    return fordeling ? [{ arbeidsgiver, fordeling }] : [];
  });
  const utskriftsfordelinger = kort.flatMap(({ arbeidsgiver, fordeling }) =>
    fordeling.inkludertePersonTreffIder.length > 0
      ? [{ arbeidsgiver, personTreffIder: fordeling.inkludertePersonTreffIder }]
      : [],
  );

  const konfliktTekst = (
    personTreffId: string,
    arbeidsgiverTreffId: string,
  ) => {
    const konflikt = konflikter.find(
      (muligKonflikt) =>
        muligKonflikt.personTreffId === personTreffId &&
        muligKonflikt.arbeidsgiverTreffIder.includes(arbeidsgiverTreffId),
    );
    if (!konflikt) return null;

    const andreArbeidsgivere = konflikt.arbeidsgiverTreffIder
      .filter((annenId) => annenId !== arbeidsgiverTreffId)
      .map(
        (annenId) =>
          arbeidsgiverePerId.get(annenId)?.navn ?? 'en annen arbeidsgiver',
      )
      .join(', ');
    return `Plass ${konflikt.plass} også hos ${andreArbeidsgivere}`;
  };

  return {
    kort,
    utskriftsfordelinger,
    konfliktTekst,
    navnPåArbeidsgiver: (arbeidsgiverTreffId: string) =>
      arbeidsgiverePerId.get(arbeidsgiverTreffId)?.navn ?? 'arbeidsgiveren',
  };
};
