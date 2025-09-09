import { hentKandidatlisteInfo } from '@/app/api/etterregistrering/opprett/hent-kandidatlisteinfo';
import { oppdaterEtterregistrering } from '@/app/api/etterregistrering/opprett/oppdater-etterregistrering';
import { FormidlingsDataDTO } from '@/app/stilling/_ui/stilling-admin/admin_moduler/OpprettEtterregistrering';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import { RekbisError } from '@/util/rekbisError';
import { format } from 'date-fns';
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
    const datoIDag = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
    // Oppdater etterregistrering

    const stillingsData = {
      stillingsinfo: {
        ...payload.stillingsinfo,
        eierNavident: payload.navIdent ?? null,
        eierNavn: payload.reportee ?? null,
        eierNavKontorEnhetId: payload.navKontor ?? null,
      },
      stilling: {
        ...payload.stilling,
        status: StillingsStatus.Stoppet,
        firstPublished: true,
        published: datoIDag,
        expires: datoIDag,
        properties: {
          ...payload.stilling.properties,
          starttime: datoIDag,
          applicationdue: datoIDag,
        },
        administration: {
          ...payload.stilling.administration,
          status: 'DONE',
          navIdent: payload.navIdent ?? null,
          reportee: payload.reportee ?? null,
        },
      },
    };

    await oppdaterEtterregistrering({
      stillingsData: stillingsData,
      reqHeaders: request.headers,
    });

    // Vent litt for å sikre at oppdateringen har gått igjennom før vi henter kandidatliste
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // // Verifiser at kandidatlisten er oppdatert
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
    // const kandidatlisteId = kandidatlisteInfo.data.kandidatlisteId;
    // if (!kandidatlisteInfo.success) {
    //   return NextResponse.json(
    //     {
    //       message: 'Klarte ikke å hente kandidatliste informasjon',
    //       details: kandidatlisteInfo.error,
    //     },
    //     { status: 500 },
    //   );
    // }
    // const kandidatlisteId = kandidatlisteInfo.data.kandidatlisteId;

    // //  Legg til kandidater i kandidatliste
    // const kandidater = payload.formidlingKandidater.map((kandidat) => {
    //   return {
    //     fnr: kandidat.fnr,
    //     fåttJobb: true,
    //     navKontor: payload?.navKontor ?? '',
    //     stillingsId: stillingsId,
    //   };
    // });

    // const leggTilKandidater = await leggTilKandidaterPåEtterregistrering({
    //   kandidater: kandidater,
    //   kandidatlisteId: kandidatlisteId,
    //   reqHeaders: request.headers,
    // });

    // if (!leggTilKandidater.success) {
    //   return NextResponse.json(
    //     { error: 'Klarte ikke å legg til kandidater' },
    //     { status: 500 },
    //   );
    // }

    // // 7. Lukk kandidatliste

    // const lukkKandidatlisten = await lukkKandidatliste({
    //   kandidatlisteId: kandidatlisteId,
    //   reqHeaders: request.headers,
    // });

    // if (!lukkKandidatlisten.success) {
    //   return NextResponse.json(
    //     { error: 'Klarte ikke å lukke kandidatliste' },
    //     { status: 500 },
    //   );
    // }

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
