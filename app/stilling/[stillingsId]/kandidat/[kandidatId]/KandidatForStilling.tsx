'use client';

import { leggTilKandidater } from '../../../../api/kandidat-sok/leggTilKandidat';
import { useKandidatsammendrag } from '../../../../api/kandidat-sok/useKandidatsammendrag';
import SWRLaster from '../../../../components/SWRLaster';
import { useVisVarsling } from '../../../../components/varsling/Varsling';
import { useStillingsContext } from '../../StillingsContext';
import OmStillingen from '../../omStillingen/OmStillingen';
import { BodyLong, Box, Button, Heading } from '@navikt/ds-react';
import * as React from 'react';

export interface KandidatForStillingProps {
  kandidatId: string;
}

const KandidatForStilling: React.FC<KandidatForStillingProps> = ({
  kandidatId,
}) => {
  const { stillingsData } = useStillingsContext();
  const [loading, setLoading] = React.useState(false);
  const visVarsel = useVisVarsling();
  const kandidatSammendragHook = useKandidatsammendrag(kandidatId);

  const leggTilKandidatiListe = async () => {
    setLoading(true);
    try {
      await leggTilKandidater([kandidatId], stillingsData.stilling.uuid);

      visVarsel({
        innhold: 'Kandidat er lagt til i kandidatliste',
        alertType: 'success',
      });
    } catch {
      visVarsel({
        innhold: 'Klarte ikke å legge til kandidat i kandidatlisten',
        alertType: 'error',
      });
    }
    setLoading(false);
  };

  return (
    <>
      <SWRLaster hooks={[kandidatSammendragHook]}>
        {(kandidat) => {
          return (
            <Box.New
              background='raised'
              borderColor='neutral-subtleA'
              borderWidth='1'
              padding='4'
              borderRadius='xlarge'
            >
              <div className='flex justify-between items-center'>
                <div>
                  <Heading size='small' spacing={false}>
                    Kandidat for stilling
                  </Heading>

                  <BodyLong>
                    {kandidat.fornavn}, {kandidat.etternavn} (
                    {kandidat.fodselsnummer})
                  </BodyLong>
                </div>
                <Button loading={loading} onClick={leggTilKandidatiListe}>
                  Legg til kandidat
                </Button>
              </div>
            </Box.New>
          );
        }}
      </SWRLaster>
      <OmStillingen />
    </>
  );
};

export default KandidatForStilling;
