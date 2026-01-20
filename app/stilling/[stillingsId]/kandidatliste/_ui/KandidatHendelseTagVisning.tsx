import { KandidatHendelseInformasjon } from './KandidatHendelser/KandidatHendelser';
import { KandidatVisningProps } from './KandidatlisteFilter/useFiltrerteKandidater';
import { formaterNorskDato } from '@/util/dato';
import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Tag, Tooltip } from '@navikt/ds-react';
import { FC } from 'react';

export interface KandidatHendelseTagProps {
  kandidatHendelse?: KandidatHendelseInformasjon | null;
  topBar?: boolean;
}

export const SlettetTag = ({
  kandidat,
  topBar,
}: {
  kandidat: KandidatVisningProps;
  topBar?: boolean;
}) => {
  return (
    <div className={'flex flex-col items-start'}>
      <Tag
        data-color='meta-lime'
        variant={'outline'}
        size='small'
        className='inline-flex'
      >
        <div className='flex items-center gap-2'>
          <TrashIcon /> Slettet
        </div>
      </Tag>
      {!topBar && (
        <BodyShort textColor='subtle' size='small' className='mt-1'>
          {kandidat.arkivertTidspunkt &&
            formaterNorskDato({
              dato: kandidat.arkivertTidspunkt,
              visning: 'kortMåned',
            })}
        </BodyShort>
      )}
    </div>
  );
};

const KandidatHendelseTagVisning: FC<KandidatHendelseTagProps> = ({
  kandidatHendelse,
  topBar,
}) => {
  if (!kandidatHendelse) {
    return null;
  }
  if (!kandidatHendelse.tag) {
    return null;
  }

  if (topBar) {
    return kandidatHendelse.tag;
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
