import { storForbokstavString } from '../../../../kandidat/util';
import { KandidatutfallTyper } from './KandidatTyper';
import { Tag } from '@navikt/ds-react';

export interface UsynligKandidatHendelseTagProps {
  utfall: string;
}

const UsynligKandidatHendelseTag: React.FC<UsynligKandidatHendelseTagProps> = ({
  utfall,
}) => {
  const utfallTekst = utfall
    ? storForbokstavString(utfall).replace(/_/g, ' ')
    : null;

  const tagVariant = () => {
    switch (utfall) {
      case KandidatutfallTyper.IKKE_PRESENTERT:
        return 'neutral';
      case KandidatutfallTyper.PRESENTERT:
        return 'info';
      case KandidatutfallTyper.FATT_JOBBEN:
        return 'success';
      default:
        return 'info';
    }
  };

  return utfallTekst ? (
    <Tag variant={tagVariant()} size='small'>
      {utfallTekst}
    </Tag>
  ) : null;
};

export default UsynligKandidatHendelseTag;
