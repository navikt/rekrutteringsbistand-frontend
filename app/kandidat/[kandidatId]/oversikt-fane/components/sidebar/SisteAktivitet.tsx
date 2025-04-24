import { useKandidatListeoversikt } from '../../../../../api/kandidat/useKandidatListeoversikt';
import SWRLaster from '../../../../../components/SWRLaster';
import KandidatStatusTag from '../../../../../stilling/[stillingsId]/kandidatliste/components/StatusTag';
import { useKandidatContext } from '../../../KandidatContext';
import { BodyShort, Button, Link } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const SisteAktivitet: React.FC = () => {
  const { kandidatId } = useKandidatContext();
  const kandidatListeoversiktHook = useKandidatListeoversikt(kandidatId);
  const router = useRouter();
  return (
    <>
      <SWRLaster hooks={[kandidatListeoversiktHook]}>
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
                    className='flex items-start justify-between'
                  >
                    <div>
                      {aktivitet.erMaskert ? (
                        <BodyShort className='text-[var(--a-text-error)]'>
                          Ingen tilgang
                        </BodyShort>
                      ) : (
                        <Link
                          href={`/stilling/${aktivitet.stillingId}`}
                          className='text-[var(--ax-text-default)]'
                        >
                          <BodyShort weight='semibold'>
                            {aktivitet.tittel ?? '-'}
                          </BodyShort>
                        </Link>
                      )}
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
        className='mt-6 w-full'
        onClick={() =>
          router.push(`/kandidat/${kandidatId}?kandidatFane=aktivitet`)
        }
      >
        Vis all aktivitet
      </Button>
    </>
  );
};

export default SisteAktivitet;
