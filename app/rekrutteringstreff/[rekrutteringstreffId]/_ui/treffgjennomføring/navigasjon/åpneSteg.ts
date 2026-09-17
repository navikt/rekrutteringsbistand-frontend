import {
  erStegTilgjengelig,
  hentNåddSteg,
  hentSynligeSteg,
} from './treffgjennomføringSteg';
import {
  fordelIntervjuer,
  settGjeldendeSteg,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';

export const åpneSteg = async (
  rekrutteringstreffId: string,
  stegnummer: number,
  treffgjennomføring: TreffgjennomføringDTO,
  erWorkOp: boolean,
  brukLagretSvar: (oppdatert: TreffgjennomføringDTO) => Promise<void>,
): Promise<TreffgjennomføringDTO> => {
  const steg = hentSynligeSteg(erWorkOp).find((steg) => steg.id === stegnummer);
  if (!steg || !erStegTilgjengelig(stegnummer, treffgjennomføring, erWorkOp)) {
    throw new Error('Steget er ikke tilgjengelig');
  }

  const nåddSteg = hentNåddSteg(treffgjennomføring.gjeldendeSteg);
  if (stegnummer <= nåddSteg) return treffgjennomføring;

  let oppdatert = treffgjennomføring;
  if (
    erWorkOp &&
    stegnummer >= 4 &&
    nåddSteg < 4 &&
    oppdatert.intervjufordelinger.length === 0
  ) {
    oppdatert = await fordelIntervjuer(rekrutteringstreffId);
    await brukLagretSvar(oppdatert);
  }
  if (hentNåddSteg(oppdatert.gjeldendeSteg) < stegnummer) {
    oppdatert = await settGjeldendeSteg(
      rekrutteringstreffId,
      steg.gjeldendeSteg,
    );
    await brukLagretSvar(oppdatert);
  }
  return oppdatert;
};
