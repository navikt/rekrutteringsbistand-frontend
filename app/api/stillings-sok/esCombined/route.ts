import { ESCombinedBody, executeCombinedSearch } from '../combinedUtil';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  let body: ESCombinedBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Ugyldig JSON-body for kombinert stillingssøk' },
      { status: 400 },
    );
  }
  if (!body || typeof body !== 'object' || !body.treff || !body.aggs) {
    return NextResponse.json(
      { error: 'Body må inneholde både "treff" og "aggs"' },
      { status: 400 },
    );
  }

  return executeCombinedSearch(req, body);
}
