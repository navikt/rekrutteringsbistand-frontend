import FiltrertKandidatListeVisning from '@/app/stilling/[stillingsId]/kandidatliste/FiltrertKandidatListeVisning';
import KandidatlisteWrapper from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteWrapper';
import * as React from 'react';

const FormidlingKandidater: React.FC = () => {
  return (
    <div className='w-full'>
      <KandidatlisteWrapper>
        <FiltrertKandidatListeVisning />
      </KandidatlisteWrapper>
    </div>
  );
};

export default FormidlingKandidater;
