import { pamOntologiFetch } from '../pamOntologiFetch';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q');
  return pamOntologiFetch(`samledeKvalifikasjoner?q=${q}`, `samlede_kvalifikasjoner?q=${q}`);
}
