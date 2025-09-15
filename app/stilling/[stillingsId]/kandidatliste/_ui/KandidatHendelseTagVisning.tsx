import { KandidatHendelseInformasjon } from './KandidatHendelser/KandidatHendelser';
import { KandidatVisningProps } from './KandidatlisteFilter/useFiltrerteKandidater';
import { formaterNorskDato } from '@/util/util';
import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Tag, Tooltip } from '@navikt/ds-react';
import { FC } from 'react';

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
          formaterNorskDato({
            dato: kandidat.arkivertTidspunkt,
            visning: 'kortMåned',
          })}
      </BodyShort>
    </div>
  );
};

const KandidatHendelseTagVisning: FC<KandidatHendelseTagProps> = ({
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
      <div>
        {kandidatHendelse.tag}
        {kandidatHendelse.dato && (
          <BodyShort textColor='subtle'>
            {formaterNorskDato({ dato: kandidatHendelse.dato })}
          </BodyShort>
        )}
      </div>
    </Tooltip>
  );
};

export default KandidatHendelseTagVisning;
