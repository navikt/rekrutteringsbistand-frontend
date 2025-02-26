import { NextResponse } from 'next/server';

export interface FormidlingAvUsynligKandidatOutboundDto {
  fnr: string;
  presentert: boolean;
  fåttJobb: boolean;
  navKontor: string;
  stillingsId: string;
}

export async function POST(): Promise<NextResponse> {
  try {
    // const protocol = request.headers.get('x-forwarded-proto') || 'http';
    // const host = request.headers.get('host');
    // const baseUrl = `${protocol}://${host}`;

    /// 1. Skal opprette en formidling ved å først kalle
    // const response = await request.json();

    // 5. Avslutt formidlingen <':)
    //TODO
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Error creating formidling:', error);
    return NextResponse.json(
      { error: 'Failed to create formidling' },
      { status: 500 },
    );
  }
}
