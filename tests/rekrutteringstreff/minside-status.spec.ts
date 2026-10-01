import type { HendelseDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { utledMinsideStatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/minsideStatusUtil';
import { JobbsøkerHendelsestype } from '@/app/rekrutteringstreff/_types/constants';
import { expect, test } from '@playwright/test';

const svarFraMinside = (
  mal: string,
  flettedata: string[] | null = null,
): HendelseDTO => ({
  id: 'test-hendelse',
  tidspunkt: '2026-09-01T10:00:00+02:00',
  hendelsestype: JobbsøkerHendelsestype.MOTTATT_SVAR_FRA_MINSIDE,
  opprettetAvAktørType: 'SYSTEM',
  aktørIdentifikasjon: null,
  hendelseData: {
    varselId: 'test-varsel',
    avsenderReferanseId: 'test-treff',
    fnr: 'test-fnr',
    eksternStatus: 'SENDT',
    minsideStatus: 'OPPRETTET',
    opprettet: '2026-09-01T10:00:00+02:00',
    avsenderNavident: 'Z999999',
    eksternFeilmelding: null,
    eksternKanal: 'SMS',
    mal,
    flettedata,
  },
});

for (const [mal, forventet] of [
  ['KANDIDAT_INVITERT_TREFF', 'Invitert'],
  ['KANDIDAT_INVITERT_WORKOP', 'Invitert'],
  ['KANDIDAT_INVITERT_TREFF_AVLYST', 'Avlyst'],
  ['KANDIDAT_INVITERT_WORKOP_AVLYST', 'Avlyst'],
] as const) {
  test(`varselet ${mal} vises som «${forventet}»`, () => {
    const status = utledMinsideStatus([svarFraMinside(mal)]);

    expect(status.type).toBe('SMS');
    expect(status.tooltip).toContain(forventet);
  });
}

test('endringsvarsel for WorkOp viser hvilke felt som er endret', () => {
  const status = utledMinsideStatus([
    svarFraMinside('KANDIDAT_INVITERT_WORKOP_ENDRET', ['tidspunkt', 'sted']),
  ]);

  expect(status.tooltip).toContain('Endret (tidspunkt og sted)');
});
