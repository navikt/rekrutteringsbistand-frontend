'use client';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import InfoBoks from '@/app/stilling/[stillingsId]/_ui/InfoBoks';
import GjenåpneStillingKnapp from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/fullfør-oppdrag/GjenåpneStillingKnapp';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import SWRLaster from '@/components/SWRLaster';
import { formaterNorskDato } from '@/util/dato';
import { BodyShort, Box, Heading } from '@navikt/ds-react';

export default function GjenåpneBanner() {
  const { stillingsData, erEier } = useStillingsContext();
  const kandidatlisteForEier = useKandidatlisteForEier(stillingsData, erEier);
  const stillingskategori = stillingsData?.stillingsinfo?.stillingskategori;
  const erEtterregistrering =
    stillingskategori === Stillingskategori.Formidling;

  const totalStillinger =
    Number(stillingsData?.stilling?.properties?.positioncount) || 1;

  return (
    <SWRLaster hooks={[kandidatlisteForEier]}>
      {(kandidatlisteForEier) => {
        const ikkeArkiverteKandidater =
          kandidatlisteForEier?.kandidater?.filter((k) => !k.arkivert) ?? [];

        const kandidaterSomHarFåttJobb =
          ikkeArkiverteKandidater
            .filter((k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN)
            .map((k) => `${k.fornavn} ${k.etternavn}`) || [];

        const usynligeKandidaterSomHarFåttJobb =
          kandidatlisteForEier?.formidlingerAvUsynligKandidat
            ?.filter((k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN)
            .map((k) => `${k.fornavn} ${k.etternavn}`) || [];

        const antallKandidaterSomHarFåttJobb =
          (kandidaterSomHarFåttJobb?.length || 0) +
          (usynligeKandidaterSomHarFåttJobb?.length || 0);
        return (
          <InfoBoks>
            <div className='grid grid-cols-3'>
              <div>
                <Heading size='small' level='3'>
                  {erEtterregistrering
                    ? 'Registreringen er fullført'
                    : 'Oppdrag fullført'}{' '}
                  💪
                </Heading>
                <BodyShort
                  size='small'
                  className='text-[var(--ax-text-neutral-subtle)]'
                >
                  av {stillingsData.stilling?.administration?.reportee}{' '}
                  {formaterNorskDato({ dato: stillingsData.stilling.updated })}
                </BodyShort>
              </div>
              <div className='justify-self-center'>
                {antallKandidaterSomHarFåttJobb > 0 ? (
                  <Heading size='xsmall' level='3'>
                    🎯 Her traff du blink
                  </Heading>
                ) : (
                  <Heading size='xsmall' level='3'>
                    🐟 Ingen napp denne gangen
                  </Heading>
                )}
                <BodyShort size='small'>
                  {antallKandidaterSomHarFåttJobb} av {totalStillinger}{' '}
                  stillinger ble besatt
                </BodyShort>
              </div>
              <div className='self-center justify-self-end'>
                <GjenåpneStillingKnapp />
              </div>
            </div>
          </InfoBoks>
        );
      }}
    </SWRLaster>
  );
}
