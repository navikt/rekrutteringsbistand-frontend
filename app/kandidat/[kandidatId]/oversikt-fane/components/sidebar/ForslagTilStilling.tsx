import { BodyShort, Button } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useStillingssøk } from '../../../../../api/stillings-sok/useStillingssøk';
import { useApplikasjonContext } from '../../../../../ApplikasjonContext';
import Sidelaster from '../../../../../components/Sidelaster';
import SWRLaster from '../../../../../components/SWRLaster';
import {
  StillingsSøkProvider,
  useStillingsSøkFilter,
} from '../../../../../stillings-sok/StillingsSøkContext';
import { useStillingForKandidat } from '../../../forslag-fane/useStillingForKandidat';
import { useKandidatContext } from '../../../KandidatContext';

const ForslagTilStilling: React.FC = () => {
  const { kandidatId } = useKandidatContext();

  const router = useRouter();

  return (
    <div className='bg-white  rounded-lg shadow-sm'>
      {/* <Heading size='medium' level='2' spacing>
        Forslag til stillinger
      </Heading> */}
      <StillingsSøkProvider formidlinger={false}>
        <StillingForslagTilKandidat kandidatId={kandidatId} />
      </StillingsSøkProvider>
      <Button
        variant='secondary'
        className='w-full mt-6'
        onClick={() =>
          router.push(`/kandidat/${kandidatId}?visFane=forslagTilStilling`)
        }
      >
        Finn aktuelle stillinger
      </Button>
    </div>
  );
};

const StillingForslagTilKandidat = ({ kandidatId }: { kandidatId: string }) => {
  const stillingssøkData = useStillingForKandidat(kandidatId);

  const filter = useStillingsSøkFilter();

  const {
    brukerData: { ident },
  } = useApplikasjonContext();
  const hook = useStillingssøk(filter, ident, filter.formidlinger);

  if (stillingssøkData.isLoading) {
    return <Sidelaster />;
  }
  return (
    <SWRLaster hook={hook}>
      {(data) => (
        <div className='space-y-8'>
          {data?.hits?.hits
            ?.sort((a, b) => {
              // If both have expiration dates, compare them
              if (a._source.stilling.expires && b._source.stilling.expires) {
                return (
                  new Date(a._source.stilling.expires).getTime() -
                  new Date(b._source.stilling.expires).getTime()
                );
              }
              // If a has no expiration, put it last
              if (!a._source.stilling.expires) return 1;
              // If b has no expiration, put it last
              if (!b._source.stilling.expires) return -1;
              // If neither has expiration, keep original order
              return 0;
            })
            ?.slice(0, 3)
            ?.map((rawData) => {
              const stilling = rawData._source.stilling;
              return (
                <div
                  className='flex justify-between items-start'
                  key={stilling.uuid}
                >
                  <div>
                    <Link
                      href={`/stilling/${stilling.uuid}`}
                      className='underline text-text-default'
                    >
                      <BodyShort
                        className='max-w-[250px] truncate'
                        weight='semibold'
                      >
                        {stilling.tittel ?? '-'}
                      </BodyShort>
                    </Link>
                    <BodyShort className='max-w-[250px] truncate' size='small'>
                      {stilling.businessName}
                    </BodyShort>
                  </div>

                  <div className='text-right'>
                    <BodyShort size='small'>Frist</BodyShort>

                    <BodyShort size='small'>
                      {stilling.expires
                        ? format(new Date(stilling.expires), 'd. MMMM yyyy', {
                            locale: nb,
                          })
                        : '-'}
                    </BodyShort>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </SWRLaster>
  );
};

export default ForslagTilStilling;
