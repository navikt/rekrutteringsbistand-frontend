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
  /**
   * Kontroller vertikal justering av ikon i forhold til tekst.
   * 'top' sikrer at ikonet flukter med første tekstlinje (ønsket for multi-line tekst i kort).
   * 'center' kan brukes der tidligere oppførsel (vertikal sentrering) er ønsket.
   */
  align?: 'top' | 'center';
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
  align = 'top',
}) => {
  if (hideIfEmpty && !tekst) {
    return null;
  }
  if (!tekst && !ikon) {
    return '-';
  }

  return (
    <div
      className={`flex ${align === 'center' ? 'items-center' : 'items-start'} ${className}`}
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
