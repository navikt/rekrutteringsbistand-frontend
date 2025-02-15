import { NextResponse } from 'next/server';

import { format } from 'date-fns';
import { NextRequest } from 'next/server';
import { FormidlingDataForm } from '../../../formidlinger/[stillingsId]/rediger/redigerFormidlingFormType';
import { KandidatutfallTyper } from '../../../stilling/[stillingsId]/kandidater/components/KandidatTyper';
import { Stillingskategori } from '../../../stilling/stilling-typer';
import { KandidatAPI } from '../../api-routes';
import { OpprettNyStillingDTO } from '../../stilling/ny-stilling/dto';

export interface FormidlingAvUsynligKandidatOutboundDto {
  fnr: string;
  presentert: boolean;
  fåttJobb: boolean;
  navKontor: string;
  stillingsId: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host');
    const baseUrl = `${protocol}://${host}`;

    /// 1. Skal opprette en formidling ved å først kalle
    const response = await request.json();

    const formidlingsDataDto: FormidlingDataForm = response;

    const opprettStillingDto: OpprettNyStillingDTO = {
      kategori: Stillingskategori.Formidling,
      stilling: {
        administration: {
          status: 'PENDING',
          reportee: formidlingsDataDto.reportee,
          navIdent: formidlingsDataDto.navIdent,
        },
        createdBy: 'pam-rekrutteringsbistand',
        updatedBy: 'pam-rekrutteringsbistand',
        source: 'DIR',
        medium: 'DIR',
        businessName: formidlingsDataDto.omFormidling.organisasjon.navn,
        privacy: 'INTERNAL_NOT_SHOWN',
        employer: {
          orgnr:
            formidlingsDataDto.omFormidling.organisasjon.organisasjonsnummer ??
            '',
          name: formidlingsDataDto.omFormidling.organisasjon.navn,
          location: {
            address:
              formidlingsDataDto.omFormidling.organisasjon.adresse.adresse ??
              '',
            postalCode:
              formidlingsDataDto.omFormidling.organisasjon.adresse.postnummer ??
              '',
            county:
              formidlingsDataDto.omFormidling.organisasjon.adresse.kommune ??
              '',
            country:
              formidlingsDataDto.omFormidling.organisasjon.adresse.land ?? '',
            municipal:
              formidlingsDataDto.omFormidling.organisasjon.adresse
                .kommunenummer ?? '',
            city:
              formidlingsDataDto.omFormidling.organisasjon.adresse.poststed ??
              '',
          },
        },
      },
    };

    const stillingResponse = await fetch(
      `${baseUrl}/api/stilling/ny-stilling`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opprettStillingDto),
      },
    );
    const stillingDto = await stillingResponse.json();

    // fetche stilling på nytt?

    /// 2. Deretter sette stillingen til publisert ved å oppdatere stilling
    const publisertStilling = {
      ...stillingDto,
      stilling: {
        ...stillingDto.stilling,
        status: 'ACTIVE',
        administration: {
          ...stillingDto.stilling.administration,
          status: 'DONE',
        },
        firstPublished: true,
        published: format(new Date(), `yyyy-MM-dd'T'HH:mm:ss.SSSSSS`),
      },
    };

    const publiserStillingResponse = await fetch(
      `${baseUrl}/api/stilling/oppdater-stilling`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(publisertStilling),
      },
    );
    const publiserStillingDto = await publiserStillingResponse.json();

    /// 3. Hent kandidatlisteId
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const kandidatlisteResponse = await fetch(``);
    const { kandidatlisteId } = await kandidatlisteResponse.json();

    /// 4. Legg til kandidater til kandidatliste
    const formidlingsDto = {
      //TODO Prøv å fjern presentert
      presentert: KandidatutfallTyper.PRESENTERT,
      fåttJobb: KandidatutfallTyper.FATT_JOBBEN,
      navKontor: response.navKontor,
      stillingsId: stillingDto.stilling.uuid,
    };

    formidlingsDataDto.omKandiatene.forEach(async (kandidat) => {
      await fetch(
        `${KandidatAPI.api_route}/veileder/kandidatlister/${kandidatlisteId}/formidlingeravusynligkandidat`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fnr: kandidat.fnr,
            ...formidlingsDto,
          }),
        },
      );
    });

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
