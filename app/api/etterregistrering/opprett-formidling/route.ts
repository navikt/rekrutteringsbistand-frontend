import { NextRequest, NextResponse } from 'next/server';
import { mapFormTilFormidling } from '../../../formidlinger/ny-formidling/mapFormidling';
import { FormidlingDataForm } from '../../../formidlinger/ny-formidling/redigerFormidlingFormType';
import { hentEtterregistrering } from './hentEtterregistrering';
import { hentKandidatlisteInfo } from './hentKandidatlisteInfo';
import { leggTilKandidaterPåEtterregistrering } from './leggTilKandidaterPåEtterregistrering';
import { oppdaterEtterregistrering } from './oppdaterEtterregistrering';
import { opprettEtterregistrering } from './opprettEtterregistrering';
import { opprettStillingForFormidlingMapper } from './opprettStillingForFormidlingMapper';

export interface FormidlingAvUsynligKandidatOutboundDto {
  fnr: string;
  presentert: boolean;
  fåttJobb: boolean;
  navKontor: string;
  stillingsId: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formidlingData: FormidlingDataForm = await request.json();

    // 1. Opprett stilling for å kunne berike data:
    const opprettStillingData =
      opprettStillingForFormidlingMapper(formidlingData);
    const nyEtterregistrering = await opprettEtterregistrering({
      nyEtterregistreringDTO: opprettStillingData,
      reqHeaders: request.headers,
    });

    if (!nyEtterregistrering.success) {
      return NextResponse.json(
        { error: 'Klarte ikke å opprette formidling' },
        { status: 500 },
      );
    }

    const stillingsId = nyEtterregistrering.data?.stilling.uuid;
    // 2. Hent ny stilling igjen for å unngå DB-lås:
    const nyFormidling = await hentEtterregistrering({
      stillingsId,
      reqHeaders: request.headers,
    });

    if (!nyFormidling.success) {
      return NextResponse.json(
        { error: 'Klarte ikke å hente formidling' },
        { status: 500 },
      );
    }

    // 3. Oppdatter formidling med ny data og sett som publisert

    const oppdatertFormidlingData = mapFormTilFormidling(
      {
        ...formidlingData,
        navKontor: formidlingData.navKontor ?? '',
      },
      nyFormidling.data,
    );

    await oppdaterEtterregistrering({
      nyData: oppdatertFormidlingData,
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
    const kandidater = formidlingData?.omKandidatene.map((kandidat) => {
      return {
        fnr: kandidat.fnr,
        fåttJobb: true,
        navKontor: formidlingData?.navKontor ?? '',
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
        { error: 'Klarte ikke å hente kandidatliste informasjon' },
        { status: 500 },
      );
    }

    return NextResponse.json({ stillingsId: stillingsId });
  } catch (error) {
    console.error('Error creating formidling:', error);
    return NextResponse.json(
      { error: 'Klarte ikke å opprette etterregistrering' },
      { status: 500 },
    );
  }
}
