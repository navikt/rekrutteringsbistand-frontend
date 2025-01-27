import * as React from 'react';

export interface ITekstMedIkon {
  tekst?: string | null;
  ikon?: React.ReactElement;
  title?: string;
  ariaLabel?: string;
  className?: string;
}

const TekstMedIkon: React.FC<ITekstMedIkon> = ({
  tekst,
  ikon,
  title,
  ariaLabel,
  className,
}) => {
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
      <span className='ml-2'>{tekst}</span>
    </div>
  );
};

export default TekstMedIkon;
