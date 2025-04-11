import { KandidatHendelseInformasjon } from './KandidatHendelser/KandidatHendelser';
import { BodyShort, Tag } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';

export interface KandidatHendelseTagProps {
  kandidatHendelse?: KandidatHendelseInformasjon | null;
  sidebar?: boolean;
}

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
      <BodyShort textColor='subtle' size='small' className='mt-1'>
        {kandidatHendelse.dato &&
          format(kandidatHendelse.dato, 'dd MMM yyyy', {
            locale: nb,
          })}
      </BodyShort>
    </div>
  );
};

export default KandidatHendelseTag;
