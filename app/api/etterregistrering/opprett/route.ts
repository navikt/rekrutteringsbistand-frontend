import { leggTilKandidaterPåEtterregistrering } from '@/app/api/etterregistrering/opprett/etterregistrer-kandidater';
import { hentKandidatlisteInfo } from '@/app/api/etterregistrering/opprett/hent-kandidatlisteinfo';
import { lukkKandidatliste } from '@/app/api/etterregistrering/opprett/lukk-kandidatlist';
import { oppdaterEtterregistrering } from '@/app/api/etterregistrering/opprett/oppdater-etterregistrering';
import { FormidlingsDataDTO } from '@/app/stilling/_ui/stilling-admin/admin_moduler/OpprettEtterregistrering';
import { RekbisError } from '@/util/rekbisError';
import { NextRequest, NextResponse } from 'next/server';

export interface FormidlingAvUsynligKandidatOutboundDto {
  fnr: string;
  presentert: boolean;
  fåttJobb: boolean;
  navKontor: string;
  stillingsId: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const payload: FormidlingsDataDTO = await request.json();

    const stillingsId = payload.stilling.uuid;

    await oppdaterEtterregistrering({
      nyData: {
        stillingsinfo: {
          ...payload.stillingsinfo,
          eierNavident: payload.navIdent ?? null,
          eierNavn: payload.reportee ?? null,
          eierNavKontorEnhetId: payload.navKontor ?? null,
        },
        stilling: {
          ...payload.stilling,
          administration: {
            ...payload.stilling.administration,
            navIdent: payload.navIdent ?? null,
            reportee: payload.reportee ?? null,
          },
        },
      },
      reqHeaders: request.headers,
    });

    // 4 Verifiser at kandidatlisten er oppdatert
    const kandidatlisteInfo = await hentKandidatlisteInfo({
      stillingsId,
      reqHeaders: request.headers,
    });

    if (!kandidatlisteInfo.success) {
      return NextResponse.json(
        { error: 'Klarte ikke å hente kandidatliste informasjon' },
        { status: 500 },
      );
    }
    const kandidatlisteId = kandidatlisteInfo.data.kandidatlisteId;

    // 6. Legg til kandidater i kandidatliste
    const kandidater = payload.formidlingKandidater.map((kandidat) => {
      return {
        fnr: kandidat.fnr,
        fåttJobb: true,
        navKontor: payload?.navKontor ?? '',
        stillingsId: stillingsId,
      };
    });

    const leggTilKandidater = await leggTilKandidaterPåEtterregistrering({
      kandidater: kandidater,
      kandidatlisteId: kandidatlisteId,
      reqHeaders: request.headers,
    });

    if (!leggTilKandidater.success) {
      return NextResponse.json(
        { error: 'Klarte ikke å legg til kandidater' },
        { status: 500 },
      );
    }

    // 7. Lukk kandidatliste

    const lukkKandidatlisten = await lukkKandidatliste({
      kandidatlisteId: kandidatlisteId,
      reqHeaders: request.headers,
    });

    if (!lukkKandidatlisten.success) {
      return NextResponse.json(
        { error: 'Klarte ikke å lukke kandidatliste' },
        { status: 500 },
      );
    }

    return NextResponse.json({ stillingsId: stillingsId });
  } catch (error) {
    new RekbisError({
      message: 'Klarte ikke å opprette etterregistrering',
      error,
    });
    return NextResponse.json(
      { error: 'Klarte ikke å opprette etterregistrering' },
      { status: 500 },
    );
  }
}
