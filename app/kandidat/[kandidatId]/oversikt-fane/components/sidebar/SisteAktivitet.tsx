import { BodyShort, Button } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useKandidatListeoversikt } from '../../../../../api/kandidat/useKandidatListeoversikt';
import SWRLaster from '../../../../../components/SWRLaster';
import KandidatStatusTag from '../../../../../stilling/[stillingsId]/kandidater/components/StatusTag';
import { useKandidatContext } from '../../../KandidatContext';

const SisteAktivitet: React.FC = () => {
  const { kandidatId } = useKandidatContext();
  const hook = useKandidatListeoversikt(kandidatId);
  const router = useRouter();
  return (
    <div className='bg-white  rounded-lg shadow-sm'>
      {/* <Heading size='medium' level='2' spacing>
        Siste aktivitet
      </Heading> */}

      <SWRLaster hook={hook}>
        {(data) => (
          <div className='space-y-8'>
            {data
              ?.sort(
                (a, b) =>
                  new Date(b.lagtTilTidspunkt).getTime() -
                  new Date(a.lagtTilTidspunkt).getTime(),
              )
              ?.slice(0, 3)
              ?.map((aktivitet) => {
                return (
                  <div
                    key={aktivitet.uuid}
                    className='flex justify-between items-start'
                  >
                    <div>
                      <Link
                        href={`/stilling/${aktivitet.stillingId}`}
                        className=' text-text-default'
                      >
                        {aktivitet.erMaskert ? (
                          <span className='text-red-600'>Ingen tilgang</span>
                        ) : (
                          <BodyShort weight='semibold'>
                            {aktivitet.tittel ?? '-'}
                          </BodyShort>
                        )}
                      </Link>
                      <BodyShort size='small'>
                        {aktivitet.organisasjonNavn}
                      </BodyShort>
                    </div>

                    <div className='text-right'>
                      <BodyShort size='small'>
                        {format(
                          new Date(aktivitet.lagtTilTidspunkt),
                          'd. MMMM yyyy',
                          { locale: nb },
                        )}
                      </BodyShort>
                      <KandidatStatusTag status={aktivitet.status} liten />
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </SWRLaster>

      <Button
        variant='secondary'
        className='w-full mt-6'
        onClick={() => router.push(`/kandidat/${kandidatId}?visFane=aktivitet`)}
      >
        Vis all aktivitet
      </Button>
    </div>
  );
};

export default SisteAktivitet;
