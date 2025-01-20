import { Button, Heading } from '@navikt/ds-react';
import router from 'next/router';
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
  const varsel = useVisVarsling();

  const lagreFormidling = async () => {
    setLoading(true);
    const nyStillingsData = mapFormTilStilling(getValues(), stillingsData);

    try {
      const response = await oppdaterStilling(nyStillingsData);

      if (response.stilling?.uuid) {
        router.push(`/stilling/${response.stilling.uuid}`);
      } else {
        throw new Error('Mangler UUID i responsen');
      }
    } catch (error) {
      varsel({
        innhold: 'Feil ved oppdatering av stilling',
        alertType: 'error',
      });
    } finally {
      setLoading(false);
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
