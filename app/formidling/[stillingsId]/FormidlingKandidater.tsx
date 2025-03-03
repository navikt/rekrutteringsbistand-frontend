import { useKandidatliste } from '../../api/kandidat/useKandidatliste';
import SWRLaster from '../../components/SWRLaster';
import { useStillingsContext } from '../../stilling/[stillingsId]/StillingsContext';
import { StillingsKandidaterFilterProvider } from '../../stilling/[stillingsId]/kandidater/StillingsKandidaterFilterContext';
import StillingsKandidaterTabell from '../../stilling/[stillingsId]/kandidater/StillingsKandidaterTabell';
import * as React from 'react';

const FormidlingKandidater: React.FC = () => {
  const { stillingsData } = useStillingsContext();

  const kandidatlisteHook = useKandidatliste(stillingsData.stilling.uuid);

  return (
    <StillingsKandidaterFilterProvider>
      <SWRLaster hooks={[kandidatlisteHook]}>
        {(kandidatliste) => {
          return (
            <div className='w-full'>
              <StillingsKandidaterTabell
                lukketKandidatliste={true}
                key={stillingsData.stilling.uuid}
                search={''}
                kandidatliste={kandidatliste}
                stillingsId={stillingsData.stilling.uuid}
                reFetchKandidatliste={() => kandidatlisteHook.mutate()}
              />
            </div>
          );
        }}
      </SWRLaster>
    </StillingsKandidaterFilterProvider>
  );
};

export default FormidlingKandidater;
