import { useVisPersonTreffId } from '../../../vis-person/useVisPersonTreffId';
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
  const [, setVisPersonTreffId] = useVisPersonTreffId();

  return (
    <div
      className='aksel-link'
      onClick={() => kandidatnummer && setVisPersonTreffId(kandidatnummer)}
    >
      {storForbokstavFlereOrd(etternavn)}, {storForbokstavFlereOrd(fornavn)}
    </div>
  );
};

export default NavnLenke;
