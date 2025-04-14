import { KandidatHendelseInformasjon } from './KandidatHendelser/KandidatHendelser';
import { KandidatVisningProps } from './KandidatlisteFilter/useFiltrerteKandidater';
import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Tag } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';

export interface KandidatHendelseTagProps {
  kandidatHendelse?: KandidatHendelseInformasjon | null;
  sidebar?: boolean;
}

export const SlettetTag = ({
  kandidat,
  sidebar,
}: {
  kandidat: KandidatVisningProps;
  sidebar?: boolean;
}) => {
  return (
    <div
      className={
        sidebar
          ? 'flex flex-row gap-2 items-center'
          : 'flex flex-col items-start'
      }
    >
      <Tag variant={'alt2'} size='small' className='inline-flex '>
        <div className='flex gap-2 items-center'>
          <TrashIcon /> Slettet
        </div>
      </Tag>

      <BodyShort textColor='subtle' size='small' className='mt-1'>
        {kandidat.arkivertTidspunkt &&
          format(new Date(kandidat.arkivertTidspunkt), 'dd. MMM yyyy', {
            locale: nb,
          })}
      </BodyShort>
    </div>
  );
};

const KandidatHendelseTag: React.FC<KandidatHendelseTagProps> = ({
  kandidatHendelse,
  sidebar,
}) => {
  if (!kandidatHendelse) {
    return null;
  }
  return (
    <div
      className={
        sidebar
          ? 'flex flex-row gap-2 items-center'
          : 'flex flex-col items-start'
      }
    >
      <Tag
        variant={
          kandidatHendelse.fargeKode as 'error' | 'info' | 'success' | 'alt1'
        }
        size='small'
        className='inline-flex '
      >
        <div className='flex gap-2 items-center'>
          {kandidatHendelse.ikon} {kandidatHendelse.tittel}
        </div>
      </Tag>

      {kandidatHendelse.frist && (
        <BodyShort textColor='subtle' size='small' className='mt-1'>
          Frist{' '}
          {format(kandidatHendelse.frist, 'dd. MMM yyyy', {
            locale: nb,
          })}
        </BodyShort>
      )}
      {!kandidatHendelse.frist && kandidatHendelse.dato && (
        <BodyShort textColor='subtle' size='small' className='mt-1'>
          {format(kandidatHendelse.dato, 'dd MMM yyyy', {
            locale: nb,
          })}
        </BodyShort>
      )}
    </div>
  );
};

export default KandidatHendelseTag;
