import { Tag } from '@navikt/ds-react';

export interface UsynligKandidatHendelseTagProps {
  utfall: {
    tittel: string;
    ikon: React.ReactNode;
    type: 'success' | 'error' | 'info';
  };
}

const UsynligKandidatHendelseTag: React.FC<UsynligKandidatHendelseTagProps> = ({
  utfall,
}) => {
  return (
    <Tag variant={utfall.type} size='small'>
      {utfall.ikon} {utfall.tittel}
    </Tag>
  );
};

export default UsynligKandidatHendelseTag;
