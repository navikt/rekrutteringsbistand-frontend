import KandidatlisteForStilling from '../../stilling/[stillingsId]/kandidatliste/KandidatlisteForStilling';
import * as React from 'react';

const FormidlingKandidater: React.FC = () => {
  return (
    <div className='w-full'>
      <KandidatlisteForStilling />
    </div>
  );
};

export default FormidlingKandidater;
