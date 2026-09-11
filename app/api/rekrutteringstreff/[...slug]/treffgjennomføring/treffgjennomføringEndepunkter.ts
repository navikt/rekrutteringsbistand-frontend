import { RekrutteringstreffAPI } from '@/app/api/api-routes';

export const treffgjennomføringEndepunkt = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/treffgjennomforing-og-oppfolging`;

export const treffgjennomføringOppdaterEndepunkt = (
  rekrutteringstreffId: string,
) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/treffgjennomforing`;

export const oppfølgingOppdaterEndepunkt = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/oppfolging`;

export const oppmøteEndepunkt = (rekrutteringstreffId: string) =>
  `${treffgjennomføringOppdaterEndepunkt(rekrutteringstreffId)}/oppmote`;

export const møteoppsettEndepunkt = (rekrutteringstreffId: string) =>
  `${treffgjennomføringOppdaterEndepunkt(rekrutteringstreffId)}/moteoppsett`;

export const flyttJobbsøkerRomEndepunkt = (
  rekrutteringstreffId: string,
  personTreffId: string,
) =>
  `${treffgjennomføringOppdaterEndepunkt(rekrutteringstreffId)}/romfordeling/${personTreffId}`;

export const fordelRomEndepunkt = (rekrutteringstreffId: string) =>
  `${treffgjennomføringOppdaterEndepunkt(rekrutteringstreffId)}/romfordeling/fordel`;

export const interesseEndepunkt = (rekrutteringstreffId: string) =>
  `${treffgjennomføringOppdaterEndepunkt(rekrutteringstreffId)}/interesse`;

export const intervjufordelingEndepunkt = (rekrutteringstreffId: string) =>
  `${treffgjennomføringOppdaterEndepunkt(rekrutteringstreffId)}/intervjufordeling`;

export const fordelIntervjuerEndepunkt = (rekrutteringstreffId: string) =>
  `${intervjufordelingEndepunkt(rekrutteringstreffId)}/fordel`;

export const stegEndepunkt = (rekrutteringstreffId: string) =>
  `${treffgjennomføringOppdaterEndepunkt(rekrutteringstreffId)}/steg`;

export const vurderingerEndepunkt = (rekrutteringstreffId: string) =>
  `${oppfølgingOppdaterEndepunkt(rekrutteringstreffId)}/vurderinger`;
