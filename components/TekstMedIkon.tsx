import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';

export interface ITekstMedIkon {
  tekst?: string | null;
  ikon?: React.ReactElement;
  title?: string;
  ariaLabel?: string;
  className?: string;
  hideIfEmpty?: boolean;
  splitSubtle?: boolean;
  subtle?: string;
}

const TekstMedIkon: React.FC<ITekstMedIkon> = ({
  tekst,
  ikon,
  title,
  ariaLabel,
  className,
  hideIfEmpty,
  subtle,
  splitSubtle,
}) => {
  if (hideIfEmpty && !tekst) {
    return null;
  }
  if (!tekst && !ikon) {
    return '-';
  }

  return (
    <div
      className={`flex items-center ${className}`}
      title={title}
      aria-label={title || ariaLabel}
    >
      {ikon}
      <div className={splitSubtle ? 'flex flex-col ml-2' : 'flex ml-2 gap-2'}>
        <span>{tekst ?? '-'}</span>
        {subtle && <BodyShort textColor='subtle'>{subtle}</BodyShort>}
      </div>
    </div>
  );
};

export default TekstMedIkon;
