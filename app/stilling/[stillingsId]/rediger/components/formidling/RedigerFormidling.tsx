import { Button, Heading } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { oppdaterStilling } from '../../../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { useVisVarsling } from '../../../../../components/varsling/Varsling';
import capitalizeEmployerName from '../../../../stilling-util';
import { useStillingsContext } from '../../../StillingsContext';
import { mapFormTilStilling } from '../../mapStilling';
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
  const { getValues, setValue, watch } = useFormContext<StillingsDataForm>();
  const { stillingsData } = useStillingsContext();
  const [loading, setLoading] = useState(false);
  const visVarsling = useVisVarsling();
  const router = useRouter();
  const lagreFormidling = async () => {
    setLoading(true);
    const nyStillingsData = mapFormTilStilling(getValues(), stillingsData);
    try {
      await oppdaterStilling(nyStillingsData);

      visVarsling({
        innhold: 'Formidling ble lagret, åpner formidling.',
        alertType: 'success',
      });

      console.log(nyStillingsData);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // router.push(`/stilling/${stillingsData.stilling.uuid}`);
    } catch (error) {
      visVarsling({
        innhold: 'Feil ved lagring av formidling',
        alertType: 'error',
      });
    }
  };

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
      <Button onClick={lagreFormidling} loading={loading}>
        Etterregistrer formidling
      </Button>
    </div>
  );
};

export default RedigerFormidling;
