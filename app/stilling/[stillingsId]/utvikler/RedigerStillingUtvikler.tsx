'use client';

import { TilgangskontrollForInnhold } from '../../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../../components/tilgangskontroll/roller';
import { useStillingsContext } from '../StillingsContext';
import Editor from '@monaco-editor/react';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

const RedigerStillingUtvikler: React.FC = () => {
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
      <span className='my-2 text-lg font-bold'>Stilling utvikler editor:</span>
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

export default RedigerStillingUtvikler;
