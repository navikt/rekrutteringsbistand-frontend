import * as React from 'react';

export interface DefinisjonProps {
  tittel: string;
  innhold?: string;
}

const Definisjon: React.FC<DefinisjonProps> = ({ tittel, innhold }) => {
  return (
    <div>
      <dt className='font-bold'>{tittel}</dt>
      <dd className='text-gray-700'>{innhold ?? '-'}</dd>
    </div>
  );
};

export default Definisjon;
