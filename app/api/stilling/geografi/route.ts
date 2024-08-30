import { logger } from '@navikt/next-logger';
import { NextRequest, NextResponse } from 'next/server';
import { isLocal } from '../../../../util/env';
import { proxyWithOBO } from '../../../../util/oboProxy';
import { StillingAPI } from '../../api-routes';
import fylkeJson from './fylkeMock.json';
import kommuneJson from './kommuneMock.json';

export async function GET(req: NextRequest) {
  if (isLocal) {
    return NextResponse.json({
      fylker: fylkeJson,
      kommuner: kommuneJson,
    });
  }

  try {
    const [response1, response2] = await Promise.all([
      proxyWithOBO(
        StillingAPI,
        req,
        '/stilling-api/rekrutteringsbistand/api/v1/geography/counties',
      ),
      proxyWithOBO(
        StillingAPI,
        req,
        '/stilling-api/rekrutteringsbistand/api/v1/geography/municipals',
      ),
    ]);

    const fylkeData = await response1.json();
    const kommuneData = await response2.json();

    const combinedData = {
      fylker: fylkeData,
      kommuner: kommuneData,
    };

    return NextResponse.json(combinedData);
  } catch (error) {
    logger.error('Feil ved henting av fylker og kommuner:', error);
    return NextResponse.json(
      { error: 'Feil ved henting av fylker og kommuner' },
      { status: 500 },
    );
  }
}
