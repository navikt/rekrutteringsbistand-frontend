'use client';

import { leggTilKandidater } from '../../../../api/kandidat-sok/leggTilKandidat';
import { useKandidatsammendrag } from '../../../../api/kandidat-sok/useKandidatsammendrag';
import { useKandidatliste } from '../../../../api/kandidat/useKandidatliste';
import SWRLaster from '../../../../components/SWRLaster';
import { useVisVarsling } from '../../../../components/varsling/Varsling';
import KandidatOversikt from '../../../../kandidat/[kandidatId]/oversikt-fane/KandidatOversikt';
import { useStillingsContext } from '../../StillingsContext';
import OmStillingen from '../../omStillingen/OmStillingen';
import KandidatNavigering from './KandidatNavigering';
import { Accordion, BodyLong, Box, Button, Heading } from '@navikt/ds-react';
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
  const kandidatalisteHook = useKandidatliste(stillingsData.stilling.uuid);

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
    <div className='w-full'>
      <SWRLaster hooks={[kandidatSammendragHook, kandidatalisteHook]}>
        {(kandidat, kandidatliste) => {
          // Get index of kandidat in the list

          return (
            <div>
              <KandidatNavigering
                kandidatnr={kandidat.arenaKandidatnr}
                kandidatliste={kandidatliste}
              />

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
                  {kandidatliste?.kandidater.some(
                    (k) => kandidat.arenaKandidatnr === k.kandidatnr,
                  ) ? (
                    // TODO Legg til funksjonalitet for de på listen
                    ''
                  ) : (
                    <Button loading={loading} onClick={leggTilKandidatiListe}>
                      Legg til kandidat
                    </Button>
                  )}
                </div>

                <Accordion>
                  <Accordion.Item>
                    <Accordion.Header>Om kandidaten</Accordion.Header>
                    <Accordion.Content>
                      <KandidatOversikt />
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion>
              </Box.New>
            </div>
          );
        }}
      </SWRLaster>
      <OmStillingen />
    </div>
  );
};

export default KandidatForStilling;
