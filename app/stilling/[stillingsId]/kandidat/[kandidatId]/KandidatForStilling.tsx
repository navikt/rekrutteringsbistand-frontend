'use client';

import { leggTilKandidater } from '../../../../api/kandidat-sok/leggTilKandidat';
import { useKandidatsammendrag } from '../../../../api/kandidat-sok/useKandidatsammendrag';
import { useKandidatliste } from '../../../../api/kandidat/useKandidatliste';
import SWRLaster from '../../../../components/SWRLaster';
import TekstMedIkon from '../../../../components/TekstMedIkon';
import { useVisVarsling } from '../../../../components/varsling/Varsling';
import KandidatOversikt from '../../../../kandidat/[kandidatId]/oversikt-fane/KandidatOversikt';
import { useStillingsContext } from '../../StillingsContext';
import OmStillingen from '../../omStillingen/OmStillingen';
import KandidatNavigering from './KandidatNavigering';
import {
  CandleIcon,
  EnvelopeClosedIcon,
  LocationPinIcon,
  PersonIcon,
  PhoneIcon,
} from '@navikt/aksel-icons';
import { Button, Heading } from '@navikt/ds-react';
import { differenceInYears, format } from 'date-fns';
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
        {(kandidatSammendrag, kandidatliste) => {
          // Get index of kandidat in the list

          return (
            <div>
              <KandidatNavigering
                kandidatnr={kandidatSammendrag.arenaKandidatnr}
                kandidatliste={kandidatliste}
              />

              <div className='flex justify-between items-center'>
                <div>
                  <Heading size='small' spacing={false}>
                    Kandidat for stilling
                  </Heading>

                  <div className='mt-2'>
                    <Heading size='large'>
                      {kandidatSammendrag.fornavn}{' '}
                      {kandidatSammendrag.etternavn}
                    </Heading>
                    <div className='flex gap-4'>
                      <TekstMedIkon
                        ikon={<CandleIcon />}
                        tekst={`Født ${format(kandidatSammendrag.fodselsdato, 'dd.MM.yyyy')} (${differenceInYears(new Date(), kandidatSammendrag.fodselsdato)}år) (${kandidatSammendrag.fodselsnummer})`}
                      />
                      <TekstMedIkon
                        ikon={<LocationPinIcon />}
                        tekst={`${kandidatSammendrag.adresselinje1}, ${kandidatSammendrag.postnummer} ${kandidatSammendrag.poststed}`}
                      />
                      <TekstMedIkon
                        ikon={<EnvelopeClosedIcon />}
                        tekst={kandidatSammendrag.epostadresse}
                      />
                      <TekstMedIkon
                        ikon={<PhoneIcon />}
                        tekst={kandidatSammendrag.telefon}
                      />
                    </div>
                    <div className='mt-2 flex'>
                      <TekstMedIkon
                        ikon={<PersonIcon />}
                        tekst={`Veileder: ${kandidatSammendrag.veilederVisningsnavn || 'Ukjent veileder'} ${kandidatSammendrag.veilederIdent ? `(${kandidatSammendrag.veilederIdent})` : 'N/A'} ${kandidatSammendrag.veilederEpost || ''}`.trim()}
                      />
                    </div>
                  </div>
                </div>
                {kandidatliste?.kandidater.some(
                  (k) => kandidatSammendrag.arenaKandidatnr === k.kandidatnr,
                ) ? (
                  // TODO Legg til funksjonalitet for de på listen
                  null
                ) : (
                  <Button loading={loading} onClick={leggTilKandidatiListe}>
                    Legg til kandidat
                  </Button>
                )}
              </div>

              <KandidatOversikt />
            </div>
          );
        }}
      </SWRLaster>
      <OmStillingen />
    </div>
  );
};

export default KandidatForStilling;
