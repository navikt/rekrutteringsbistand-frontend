'use client';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import GjenåpneStillingKnapp from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/fullfør-oppdrag/GjenåpneStillingKnapp';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import InfoBoks from '@/components/InfoBoks';
import SWRLaster from '@/components/SWRLaster';
import { formaterNorskDato } from '@/util/dato';
import { PadlockLockedIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading } from '@navikt/ds-react';
import { differenceInDays, endOfMonth, format, isBefore } from 'date-fns';
import { nb } from 'date-fns/locale';

/**
 * Beregner om registreringen er låst og antall dager til låsing.
 * Registreringen låses ved utgangen av måneden stillingen ble fullført.
 */
function beregnLåsestatus(fullførtDato: Date, nå: Date = new Date()) {
  const sisteDagIMåneden = endOfMonth(fullførtDato);
  const erLåst = isBefore(sisteDagIMåneden, nå);
  const dagerTilLåsing = erLåst
    ? 0
    : differenceInDays(sisteDagIMåneden, nå) + 1;
  const låseMåned = format(sisteDagIMåneden, 'd. MMMM', { locale: nb });

  return { erLåst, dagerTilLåsing, låseMåned };
}

export default function GjenåpneBanner() {
  const { stillingsData, erEier } = useStillingsContext();
  const kandidatlisteForEier = useKandidatlisteForEier(stillingsData, erEier);
  const stillingskategori = stillingsData?.stillingsinfo?.stillingskategori;
  const erEtterregistrering =
    stillingskategori === Stillingskategori.Formidling;

  const totalStillinger =
    Number(stillingsData?.stilling?.properties?.positioncount) || 1;

  const fullførtDato = new Date(stillingsData.stilling.updated);
  const { erLåst, dagerTilLåsing, låseMåned } = beregnLåsestatus(fullførtDato);

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
            <div className='grid grid-cols-4 items-center gap-x-6'>
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
                  av {stillingsData.stilling?.administration?.reportee} den{' '}
                  {formaterNorskDato({ dato: stillingsData.stilling.updated })}
                </BodyShort>
              </div>
              <div>
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
              <div className='flex items-start gap-2'>
                <PadlockLockedIcon
                  aria-hidden
                  className='mt-0.5 h-5 w-5 shrink-0'
                />
                <div>
                  {erLåst ? (
                    <>
                      <Heading size='xsmall' level='3'>
                        Registreringen er låst
                      </Heading>
                      <BodyShort size='small'>
                        Statistikken ble telt {låseMåned}.
                      </BodyShort>
                    </>
                  ) : (
                    <>
                      <Heading size='xsmall' level='3'>
                        Låses om {dagerTilLåsing}{' '}
                        {dagerTilLåsing === 1 ? 'dag' : 'dager'}
                      </Heading>
                      <BodyShort size='small'>
                        Du kan gjenåpne fram til statistikken telles {låseMåned}
                        .
                      </BodyShort>
                    </>
                  )}
                </div>
              </div>
              {!erLåst && (
                <div className='justify-self-end'>
                  <GjenåpneStillingKnapp />
                </div>
              )}
            </div>
          </InfoBoks>
        );
      }}
    </SWRLaster>
  );
}
