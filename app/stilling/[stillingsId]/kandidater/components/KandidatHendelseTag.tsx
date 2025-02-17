import { Tag } from '@navikt/ds-react';
import { KandidatHendelse } from './KandidatHendelse';

export interface KandidatHendelseTagProps {
  kandidatHendelse: KandidatHendelse;
}

const KandidatHendelseTag: React.FC<KandidatHendelseTagProps> = ({
  kandidatHendelse,
}) => {
  if (!kandidatHendelse) {
    return null;
  }
  return (
    <Tag variant={kandidatHendelse.type} size='small'>
      <div className='flex gap-2'>
        {kandidatHendelse.ikon}{' '}
        {kandidatHendelse.kilde === 'Sms' ? 'SMS' : kandidatHendelse.tittel}
      </div>
    </Tag>
  );
};

export default KandidatHendelseTag;
