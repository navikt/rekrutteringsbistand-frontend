import { useKandidatListeoversikt } from '@/app/api/kandidat/useKandidatListeoversikt';
import { useKandidatContext } from '@/app/kandidat/vis-kandidat/KandidatContext';
import InternStatusTag from '@/app/stilling/[stillingsId]/kandidatliste/_ui/InternStatusTag';
import SWRLaster from '@/components/SWRLaster';
import { BodyShort, Button, Link } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useQueryState } from 'nuqs';

const SisteAktivitet: React.FC = () => {
  const { kandidatId } = useKandidatContext();
  const [, setFane] = useQueryState('kandidatFane', {
    defaultValue: 'oversikt',
    clearOnDefault: true,
  });
  const kandidatListeoversiktHook = useKandidatListeoversikt(kandidatId);

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
                        <BodyShort className='text-[var(--ax-text-error)]'>
                          Ingen tilgang
                        </BodyShort>
                      ) : (
                        <Link
                          href={`/stilling/${aktivitet.stillingId}`}
                          className='text-[var(--ax-text-neutral)]'
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
                      <InternStatusTag status={aktivitet.status} />
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
        onClick={() => {
          setFane(`aktivitet`);
        }}
      >
        Vis all aktivitet
      </Button>
    </>
  );
};

export default SisteAktivitet;
