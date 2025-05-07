import { useQueryState } from 'nuqs';
import * as React from 'react';

interface NavnLenkeProps {
  fornavn: string;
  etternavn: string;
  kandidatnummer: string | null;
}

const storForbokstavFlereOrd = (s: string | null | undefined) => {
  if (!s || s.length === 0) return s;
  return s
    .split(' ')
    .map((o) => (o ? o[0].toUpperCase() + o.substring(1).toLowerCase() : o))
    .join(' ');
};

const NavnLenke: React.FC<NavnLenkeProps> = ({
  fornavn,
  etternavn,
  kandidatnummer,
}) => {
  const [, settKandidatnr] = useQueryState('visKandidatnr', {
    defaultValue: '',
    clearOnDefault: true,
  });

  return (
    <div className='aksel-link' onClick={() => settKandidatnr(kandidatnummer)}>
      {storForbokstavFlereOrd(etternavn)}, {storForbokstavFlereOrd(fornavn)}
    </div>
  );
};

export default NavnLenke;
