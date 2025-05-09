import { formaterNorskDato } from '../../../../components/util';
import { KandidatHendelseInformasjon } from './KandidatHendelser/KandidatHendelser';
import { KandidatVisningProps } from './KandidatlisteFilter/useFiltrerteKandidater';
import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Tag, Tooltip } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';

export interface KandidatHendelseTagProps {
  kandidatHendelse?: KandidatHendelseInformasjon | null;
  sidebar?: boolean;
}

export const SlettetTag = ({
  kandidat,
}: {
  kandidat: KandidatVisningProps;
}) => {
  return (
    <div className={'flex flex-col items-start'}>
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

const KandidatHendelseTagVisning: React.FC<KandidatHendelseTagProps> = ({
  kandidatHendelse,
}) => {
  if (!kandidatHendelse) {
    return null;
  }
  if (!kandidatHendelse.tag) {
    return null;
  }
  return (
    <Tooltip content={kandidatHendelse.tekst ?? ''}>
      <div className={`flex flex-col gap-2`}>
        <div>{kandidatHendelse.tag}</div>
        {kandidatHendelse.dato && (
          <BodyShort textColor='subtle' className='mt-1'>
            {formaterNorskDato({ dato: kandidatHendelse.dato })}
          </BodyShort>
        )}
      </div>
    </Tooltip>
  );
};

export default KandidatHendelseTagVisning;
