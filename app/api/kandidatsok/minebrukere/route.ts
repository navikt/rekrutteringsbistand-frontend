import { NextRequest, NextResponse } from 'next/server';
import { isLocal } from '../../../../util/env';
import { proxyWithOBO } from '../../../../util/oboProxy';
import { KandidatsøkAPI } from '../../api-routes';

export async function GET(req: NextRequest) {
  if (isLocal) {
    return NextResponse.json({
      kandidater: [
        {
          yrkeJobbonskerObj: [
            {
              styrkBeskrivelse: 'Frisør',
              sokeTitler: ['Frisør', 'Frisør', 'Frisørsvenn'],
              primaertJobbonske: false,
              styrkKode: null,
            },
            {
              styrkBeskrivelse: 'Sauegjeter',
              sokeTitler: ['Sauegjeter', 'Sauegjeter', 'Gjeter'],
              primaertJobbonske: false,
              styrkKode: null,
            },
            {
              styrkBeskrivelse: 'Saueklipper',
              sokeTitler: ['Saueklipper', 'Saueklipper', 'Sauegjeter'],
              primaertJobbonske: false,
              styrkKode: null,
            },
            {
              styrkBeskrivelse: 'Ullklassifisør',
              sokeTitler: [
                'Ullklassifisør',
                'Ullklassifisør',
                'Ullpresser',
                'Ullklassifisør, Ullpresse',
              ],
              primaertJobbonske: false,
              styrkKode: null,
            },
          ],
          etternavn: 'Gravemaskin',
          postnummer: '4616',
          arenaKandidatnr: 'PAM012t1avh27',
          kommuneNavn: 'Kristiansand',
          geografiJobbonsker: [
            {
              geografiKodeTekst: 'Hamar',
              geografiKode: 'NO04.0403',
            },
            {
              geografiKodeTekst: 'Råde',
              geografiKode: 'NO30.3017',
            },
            {
              geografiKodeTekst: 'Vestby',
              geografiKode: 'NO02.0211',
            },
          ],
          fornavn: 'Våken',
          fodselsnummer: '04479208765',
          kvalifiseringsgruppekode: 'BATT',
        },
        {
          yrkeJobbonskerObj: [
            {
              styrkBeskrivelse: 'Frisør',
              sokeTitler: ['Frisør', 'Frisør', 'Frisørsvenn'],
              primaertJobbonske: false,
              styrkKode: null,
            },
            {
              styrkBeskrivelse: 'Sauegjeter',
              sokeTitler: ['Sauegjeter', 'Sauegjeter', 'Gjeter'],
              primaertJobbonske: false,
              styrkKode: null,
            },
            {
              styrkBeskrivelse: 'Saueklipper',
              sokeTitler: ['Saueklipper', 'Saueklipper', 'Sauegjeter'],
              primaertJobbonske: false,
              styrkKode: null,
            },
            {
              styrkBeskrivelse: 'Ullklassifisør',
              sokeTitler: [
                'Ullklassifisør',
                'Ullklassifisør',
                'Ullpresser',
                'Ullklassifisør, Ullpresse',
              ],
              primaertJobbonske: false,
              styrkKode: null,
            },
          ],
          etternavn: 'Tomat',
          postnummer: '4628',
          arenaKandidatnr: 'PAM017xk6cpdc',
          kommuneNavn: 'Kristiansand',
          geografiJobbonsker: [
            {
              geografiKodeTekst: 'Hamar',
              geografiKode: 'NO04.0403',
            },
            {
              geografiKodeTekst: 'Råde',
              geografiKode: 'NO30.3017',
            },
            {
              geografiKodeTekst: 'Vestby',
              geografiKode: 'NO02.0211',
            },
          ],
          fornavn: 'Heldig',
          fodselsnummer: '17418940123',
          kvalifiseringsgruppekode: 'BATT',
        },
        {
          yrkeJobbonskerObj: [
            {
              styrkBeskrivelse: 'Frisør',
              sokeTitler: ['Frisør', 'Frisør', 'Frisørsvenn'],
              primaertJobbonske: false,
              styrkKode: null,
            },
            {
              styrkBeskrivelse: 'Sauegjeter',
              sokeTitler: ['Sauegjeter', 'Sauegjeter', 'Gjeter'],
              primaertJobbonske: false,
              styrkKode: null,
            },
            {
              styrkBeskrivelse: 'Saueklipper',
              sokeTitler: ['Saueklipper', 'Saueklipper', 'Sauegjeter'],
              primaertJobbonske: false,
              styrkKode: null,
            },
            {
              styrkBeskrivelse: 'Ullklassifisør',
              sokeTitler: [
                'Ullklassifisør',
                'Ullklassifisør',
                'Ullpresser',
                'Ullklassifisør, Ullpresse',
              ],
              primaertJobbonske: false,
              styrkKode: null,
            },
          ],
          etternavn: 'Tannbørste',
          postnummer: '4643',
          arenaKandidatnr: 'PAM0101tondtx',
          kommuneNavn: 'Kristiansand',
          geografiJobbonsker: [
            {
              geografiKodeTekst: 'Hamar',
              geografiKode: 'NO04.0403',
            },
            {
              geografiKodeTekst: 'Råde',
              geografiKode: 'NO30.3017',
            },
            {
              geografiKodeTekst: 'Vestby',
              geografiKode: 'NO02.0211',
            },
          ],
          fornavn: 'Pessimistisk',
          fodselsnummer: '27426831452',
          kvalifiseringsgruppekode: 'BATT',
        },
        {
          yrkeJobbonskerObj: [
            {
              styrkBeskrivelse: 'Frisør',
              sokeTitler: ['Frisør', 'Frisør', 'Frisørsvenn'],
              primaertJobbonske: false,
              styrkKode: null,
            },
            {
              styrkBeskrivelse: 'Sauegjeter',
              sokeTitler: ['Sauegjeter', 'Sauegjeter', 'Gjeter'],
              primaertJobbonske: false,
              styrkKode: null,
            },
            {
              styrkBeskrivelse: 'Saueklipper',
              sokeTitler: ['Saueklipper', 'Saueklipper', 'Sauegjeter'],
              primaertJobbonske: false,
              styrkKode: null,
            },
            {
              styrkBeskrivelse: 'Ullklassifisør',
              sokeTitler: [
                'Ullklassifisør',
                'Ullklassifisør',
                'Ullpresser',
                'Ullklassifisør, Ullpresse',
              ],
              primaertJobbonske: false,
              styrkKode: null,
            },
          ],
          etternavn: 'Bensinstasjon',
          postnummer: '4639',
          arenaKandidatnr: 'PAM011pe2kmv9',
          kommuneNavn: 'Kristiansand',
          geografiJobbonsker: [
            {
              geografiKodeTekst: 'Hamar',
              geografiKode: 'NO04.0403',
            },
            {
              geografiKodeTekst: 'Råde',
              geografiKode: 'NO30.3017',
            },
            {
              geografiKodeTekst: 'Vestby',
              geografiKode: 'NO02.0211',
            },
          ],
          fornavn: 'Horisontal',
          fodselsnummer: '21506801084',
          kvalifiseringsgruppekode: 'BATT',
        },
      ],
      navigering: {
        kandidatnumre: [
          'PAM012t1avh27',
          'PAM017xk6cpdc',
          'PAM0101tondtx',
          'PAM011pe2kmv9',
        ],
      },
      antallTotalt: 4,
    });
  }

  return proxyWithOBO(KandidatsøkAPI, req);
}
