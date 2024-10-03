'use client';
import Editor from '@monaco-editor/react';
import * as React from 'react';

import { Button } from '@navikt/ds-react';
import { TilgangskontrollForInnhold } from '../../../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Rolle } from '../../../../types/Roller';
import { oppdaterStilling } from '../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { useStillingsContext } from '../StillingsContext';

const RedigerStillingDev: React.FC = () => {
  const { stillingsData } = useStillingsContext();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [editorData, setEditorData] = React.useState<string>(
    JSON.stringify(stillingsData, null, 2),
  );

  const handleReset = () => {
    setEditorData(JSON.stringify(stillingsData, null, 2));
  };

  const lagreData = async () => {
    setIsLoading(true);
    await oppdaterStilling(JSON.parse(editorData));
    setIsLoading(false);
  };

  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]}
    >
      <span className='text-lg font-bold my-2'>Stilling utvikler editor:</span>
      <Editor
        height='50vh'
        defaultLanguage='json'
        value={editorData}
        onChange={(val) => setEditorData(val ?? '')}
      />

      <div className='mt-4 flex justify-between px-4'>
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={lagreData}>Lagre</Button>
      </div>
    </TilgangskontrollForInnhold>
  );
};

export default RedigerStillingDev;
