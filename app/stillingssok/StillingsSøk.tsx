'use client';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button, Heading } from '@navikt/ds-react';
import Link from 'next/link';
import * as React from 'react';
import SideLayout from '../../components/layout/SideLayout';
import SWRLaster from '../../components/SWRLaster';
import { TilgangskontrollForInnhold } from '../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Rolle } from '../../types/Roller';
import { useStilling } from '../api/stillingssok/stilling';
import StillingsKort from './components/StillingsKort';
import Piktogram from './icons/finn-stillinger.svg';

const mockData = {
  size: 40,
  from: 0,
  track_total_hits: true,
  query: {
    bool: {
      should: [],
      minimum_should_match: '0',
      filter: [
        {
          nested: {
            path: 'stilling.locations',
            query: {
              bool: {
                should: [
                  {
                    terms: {
                      'stilling.locations.municipalCode': ['4203'],
                    },
                  },
                ],
              },
            },
          },
        },
        {
          bool: {
            must_not: [
              {
                term: {
                  'stilling.status': 'REJECTED',
                },
              },
              {
                term: {
                  'stilling.status': 'DELETED',
                },
              },
            ],
            must: [
              {
                term: {
                  'stilling.administration.status': 'DONE',
                },
              },
              {
                exists: {
                  field: 'stilling.publishedByAdmin',
                },
              },
              {
                range: {
                  'stilling.published': {
                    lte: 'now/d',
                  },
                },
              },
            ],
          },
        },
        {
          bool: {
            must_not: [
              {
                term: {
                  'stillingsinfo.stillingskategori': 'ARBEIDSTRENING',
                },
              },
              {
                term: {
                  'stillingsinfo.stillingskategori': 'FORMIDLING',
                },
              },
            ],
          },
        },
      ],
    },
  },
  sort: {
    'stilling.published': {
      order: 'desc',
    },
  },
};
const StillingsSøk: React.FC = () => {
  const hook = useStilling(mockData);

  return (
    <SideLayout
      ikon={<Piktogram />}
      sidepanel={<div>TBD</div>}
      knappIBanner={
        <TilgangskontrollForInnhold
          skjulVarsel
          kreverEnAvRollene={[
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
          ]}
        >
          <Link href={'/stilling/ny-stilling'}>
            <Button variant='secondary' icon={<PlusCircleIcon aria-hidden />}>
              Opprett ny
            </Button>
          </Link>
        </TilgangskontrollForInnhold>
      }
      // banner={kandidatnr !== undefined && <KontekstAvKandidat kandidatnr={kandidatnr} />}
      tittel='Stillinger'
    >
      <SWRLaster hook={hook}>
        {(data) => (
          <>
            <div className='flex justify-between'>
              <div>Filtre TBD</div>
              <div>Lagre TBD</div>
            </div>
            <div className='flex justify-between'>
              <Heading size='medium'>{data._shards.total} annonser</Heading>
              <>kommer</>
            </div>
            {data.hits.hits.map((hit) => (
              <StillingsKort key={hit._id} stillingData={hit._source} />
            ))}
          </>
        )}
      </SWRLaster>
    </SideLayout>
  );
};

export default StillingsSøk;
