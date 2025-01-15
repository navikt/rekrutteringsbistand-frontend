import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import capitalizeEmployerName from '../../../../stilling-util';
import { useStillingsContext } from '../../../StillingsContext';
import { StillingsDataForm } from '../../redigerFormType.zod';
import VelgArbeidssted from '../VelgArbeidssted';
import VelgStillingTittel from '../VelgStillingTittel';
import VelgAnsettelsesform from '../praktiskInfo/VelgAnsettelsesform';
import VelgAntallStillinger from '../praktiskInfo/VelgAntallStillinger';
import VelgArbeidsTid from '../praktiskInfo/VelgArbeidsTid';
import VelgOppstartOgFrist from '../praktiskInfo/VelgOppstartOgFrist';
import VelgSektor from '../praktiskInfo/VelgSektor';

export interface RedigerFormidlingProps {
  children?: React.ReactNode | undefined;
}

const RedigerFormidling: React.FC<RedigerFormidlingProps> = ({ children }) => {
  const { watch, setValue } = useFormContext<StillingsDataForm>();
  const { stillingsData } = useStillingsContext();

  return (
    <div className='flex flex-col mx-12 px-12 gap-8 w-[80%]'>
      <Heading size='medium'>
        Etterregistrer formidling for{' '}
        {capitalizeEmployerName(stillingsData.stilling.businessName ?? '-')}(
        {stillingsData.stilling?.employer?.orgnr})
      </Heading>

      <VelgStillingTittel
        valgtJanzz={watch('omStillingen.janzz')}
        callBack={(val) => setValue('omStillingen.janzz', val)}
      />
      <div>
        <Heading size='medium'>Arbeidssted</Heading>
        <VelgArbeidssted />
      </div>
      <VelgSektor />
      <VelgAntallStillinger />
      <VelgAnsettelsesform />
      <VelgOppstartOgFrist skjulFrist />
      <VelgArbeidsTid />
    </div>
  );
};

export default RedigerFormidling;
