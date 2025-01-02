import { logger } from '@navikt/next-logger';
import { NextRequest, NextResponse } from 'next/server';
import { proxyWithOBO } from '../../../../util/oboProxy';
import { StillingAPI } from '../../api-routes';

export async function GET(req: NextRequest) {
  try {
    const [response1, response2, response3] = await Promise.all([
      proxyWithOBO(
        StillingAPI,
        req,
        '/rekrutteringsbistand/api/v1/geography/counties',
      ),
      proxyWithOBO(
        StillingAPI,
        req,
        '/rekrutteringsbistand/api/v1/geography/municipals',
      ),
      proxyWithOBO(
        StillingAPI,
        req,
        '/rekrutteringsbistand/api/v1/geography/countries',
      ),
    ]);

    const fylkeData = await response1.json();
    const kommuneData = await response2.json();
    const landData = await response3.json();

    const combinedData = {
      fylker: fylkeData,
      kommuner: kommuneData,
      land: landData,
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
