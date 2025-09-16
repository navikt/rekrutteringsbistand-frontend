import { søkEtterAntall, søkEtterHits } from './elastic-search/search-service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Utfør to separate kall parallelt
    const [antallResult, hitsResult] = await Promise.all([
      søkEtterAntall(req, body),
      søkEtterHits(req, body),
    ]);

    // Kombiner resultatene i ett objekt
    const combinedResult = {
      antall: antallResult.antall,
      tookTreff: hitsResult.took,
      tookAggs: antallResult.tookAggs || antallResult.took,
      hits: hitsResult.hits,
      _shards: hitsResult._shards,
      timed_out: hitsResult.timed_out,
      took: Math.max(hitsResult.took || 0, antallResult.took || 0),
    };

    return NextResponse.json(combinedResult);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 },
    );
  }
}
