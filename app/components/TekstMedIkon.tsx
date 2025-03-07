import * as React from 'react';

export interface ITekstMedIkon {
  tekst?: string | null;
  ikon?: React.ReactElement;
  title?: string;
  ariaLabel?: string;
  className?: string;
  hideIfEmpty?: boolean;
}

const TekstMedIkon: React.FC<ITekstMedIkon> = ({
  tekst,
  ikon,
  title,
  ariaLabel,
  className,
  hideIfEmpty,
}) => {
  if (hideIfEmpty && !tekst) {
    return null;
  }
  if (!tekst) {
    return '-';
  }
  return (
    <div
      className={`flex items-center ${className}`}
      title={title}
      aria-label={title || ariaLabel}
    >
      {ikon}
      <span className='ml-2 break-all break-words overflow-wrap-anywhere'>
        {tekst}
      </span>
    </div>
  );
};

export default TekstMedIkon;
