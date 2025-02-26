import * as React from 'react';

export interface DefinisjonProps {
  tittel: string;
  innhold?: string | null;
}

const Definisjon: React.FC<DefinisjonProps> = ({ tittel, innhold }) => {
  return (
    <div>
      <dt className='font-bold'>{tittel}</dt>
      <dd>{innhold ?? '-'}</dd>
    </div>
  );
};

export default Definisjon;
