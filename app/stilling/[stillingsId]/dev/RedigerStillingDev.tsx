'use client';
import Editor from '@monaco-editor/react';
import * as React from 'react';

import { Button } from '@navikt/ds-react';

import { Roller } from '../../../components/tilgangskontroll/roller';
import { TilgangskontrollForInnhold } from '../../../components/tilgangskontroll/TilgangskontrollForInnhold';
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
    setIsLoading(false);
    window.location.reload();
  };

  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]}
    >
      <span className='text-lg font-bold my-2'>Stilling utvikler editor:</span>
      <Editor
        height='50vh'
        defaultLanguage='json'
        value={editorData}
        onChange={(val) => setEditorData(val ?? '')}
      />

      <div className='mt-4 flex justify-between px-4'>
        <Button onClick={handleReset} disabled={isLoading}>
          Reset
        </Button>
        <Button onClick={lagreData} disabled={isLoading}>
          Lagre
        </Button>
      </div>
    </TilgangskontrollForInnhold>
  );
};

export default RedigerStillingDev;
