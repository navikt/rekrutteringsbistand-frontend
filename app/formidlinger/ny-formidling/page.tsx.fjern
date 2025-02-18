'use client';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { ArbeidsgiverDTO } from '../../api/pam-search/underenhet/useArbeidsgiver';
import SideLayout from '../../components/layout/SideLayout';
import SideTopBanner from '../../components/layout/SideTopBanner';
import { OpprettStillingKnapp } from '../../stilling/ny-stilling/components/OpprettStilling';
import VelgArbeidsgiver from '../../stilling/ny-stilling/components/VelgArbeidsgiver';
import { Stillingskategori } from '../../stilling/stilling-typer';
const NyFormidling: React.FC = () => {
  const router = useRouter();

  const [arbeidsgiver, setArbeidsgiver] =
    React.useState<ArbeidsgiverDTO | null>(null);

  const handleGoBack = () => {
    router.back();
  };

  const testInnsending = () => {
    fetch('/api/etterregistrering/opprett-formidling', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        navKontor: '123456',
        navIdent: 'Z12345',
        reportee: 'Test Nordmann',

        omTilrettelegging: {
          statligeInkluderingsdugnade: false,
          tags: ['INKLUDERING', 'INKLUDERING__ARBEIDSTID'],
        },
        omFormidling: {
          sektor: 'Privat',
          ansettelsesform: 'Fast',
          omfangKode: 'Heltid',
          adresseLokasjoner: [],
          organisasjon: {
            organisasjonsnummer: '315414822',
            navn: 'ALFABETISK PLUTSELIG KATT OVERSKRIFT',
            organisasjonsform: 'BEDR',
            antallAnsatte: 3,
            overordnetEnhet: '313606333',
            adresse: {
              land: 'Norge',
              landkode: 'NO',
              kommune: 'TRONDHEIM',
              kommunenummer: '5001',
              poststed: 'TILLER',
              postnummer: '7075',
              adresse: 'Okstadbrinken 18',
            },
            naringskoder: null,
          },
          categoryList: [
            {
              id: null,
              code: '109237',
              categoryType: 'JANZZ',
              name: 'Tester',
              description: null,
              parentId: null,
            },
            {
              id: null,
              code: 'http://data.europa.eu/esco/isco/C7543',
              categoryType: 'ESCO',
              name: 'Produkttestere (ikke matprodukter)',
              description: null,
              parentId: null,
            },
            {
              id: null,
              code: '7543',
              categoryType: 'STYRK08',
              name: null,
              description: null,
              parentId: null,
            },
          ],
          lokasjoner: [
            {
              address: null,
              postalCode: null,
              city: null,
              county: 'AGDER',
              countyCode: '42',
              municipal: 'KRISTIANSAND',
              municipalCode: '4204',
              country: null,
            },
          ],
        },
        omKandiatene: [
          {
            fnr: '16828397900',
            navn: {
              fornavn: 'Heldig',
              etternavn: 'Tomat',
              kilde: 'REKRUTTERINGSBISTAND',
            },
          },
        ],
      }),
    });
  };

  return (
    <SideLayout banner={<SideTopBanner tittel='Etterregistrer formidling' />}>
      <div>
        <div className='grid'>
          <VelgArbeidsgiver arbeidsgiverCallback={setArbeidsgiver} />
        </div>
        <div className='flex justify-end mt-4'>
          <Button
            className={'mr-4'}
            variant={'secondary'}
            onClick={handleGoBack}
          >
            Avbryt
          </Button>
          <OpprettStillingKnapp
            stillingskategori={Stillingskategori.Formidling}
            arbeidsgiver={arbeidsgiver}
          />
        </div>
      </div>
      <Button onClick={testInnsending}>Test opprettelse og publisering</Button>
    </SideLayout>
  );
};

export default NyFormidling;
