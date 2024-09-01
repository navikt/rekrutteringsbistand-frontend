import * as React from 'react';
import Hurtiglenker from './components/Hurtiglenker';
import Statistikk from './components/Statistikk';

const Forside: React.FC = () => {
  return (
    <div>
      <div className='mt-4'>
        <Hurtiglenker />
      </div>
      <div className='mt-8'>
        <Statistikk />
      </div>
    </div>
  );
};

export default Forside;
