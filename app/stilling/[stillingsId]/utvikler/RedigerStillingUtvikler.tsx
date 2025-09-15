'use client';

import { useStillingsContext } from '../StillingsContext';
import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import Editor from '@monaco-editor/react';
import { Button } from '@navikt/ds-react';
import { useState, type FC } from 'react';

const RedigerStillingUtvikler: FC = () => {
  const { stillingsData } = useStillingsContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editorData, setEditorData] = useState<string>(
    JSON.stringify(stillingsData, null, 2),
  );

  const handleReset = () => {
    setEditorData(JSON.stringify(stillingsData, null, 2));
  };

  const lagreData = async () => {
    setIsLoading(true);
    oppdaterStilling(JSON.parse(editorData), {
      eierNavident: stillingsData.stilling.administration?.navIdent ?? '',
      eierNavn: stillingsData.stilling.administration?.reportee ?? '',
      eierNavKontorEnhetId:
        stillingsData.stillingsinfo?.eierNavKontorEnhetId ?? '',
    }).then(() => {
      setIsLoading(false);
      window.location.reload();
    });
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
