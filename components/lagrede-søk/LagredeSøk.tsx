'use client';

import AdministrerSøkDialog from './AdministrerSøkDialog';
import LagreSøkDialog from './LagreSøkDialog';
import { useHentLagredeSøk } from '@/app/api/bruker/lagrede-sok/lagredeSøkApi';
import type { LagretSøkDTO } from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import {
  harFilterEllerSøkeord,
  harSammeInnhold,
} from '@/components/lagrede-søk/harSammeInnhold';
import type { LagredeSøkTilstand } from '@/components/lagrede-søk/useLagredeSøk';
import { ChevronDownIcon, CogIcon, FloppydiskIcon } from '@navikt/aksel-icons';
import {
  ActionMenu,
  BodyShort,
  Button,
  Detail,
  HStack,
  Tooltip,
  VStack,
} from '@navikt/ds-react';
import { useRef, useState } from 'react';

interface LagredeSøkProps {
  lagredeSøk: LagredeSøkTilstand;
  gjeldendeFilter: string;
  gjeldendeFritekst: string[];
  onBrukVanligSøk: () => void;
}

const VANLIG_SØK = 'vanlig-sok';

function Menyrad({ navn, merknad }: { navn: string; merknad: string }) {
  return (
    <span className='flex flex-col'>
      <span>{navn}</span>
      {merknad && (
        <Detail as='span' textColor='subtle'>
          {merknad}
        </Detail>
      )}
    </span>
  );
}

/**
 * Felles meny og lagreknapp for lagrede søk. Viser hvilke filtre som lagres.
 */
export default function LagredeSøk({
  lagredeSøk,
  gjeldendeFilter,
  gjeldendeFritekst,
  onBrukVanligSøk,
}: LagredeSøkProps) {
  const {
    domene,
    aktivtSøkId,
    setAktivtSøkId,
    brukLagretSøk,
    normaliserFilter,
    sporHendelse,
  } = lagredeSøk;
  const liste = useHentLagredeSøk(domene);
  const [lagreÅpen, setLagreÅpen] = useState(false);
  const [administrerÅpen, setAdministrerÅpen] = useState(false);
  const [menyÅpen, setMenyÅpen] = useState(false);
  // Søket brukeren sist valgte eller lagret. Overlever filterendringer, så lagre-dialogen kan foreslå det ved erstatting.
  const [forrigeSøkId, setForrigeSøkId] = useState<string | null>(null);
  const menyknappRef = useRef<HTMLButtonElement>(null);
  const lagreknappRef = useRef<HTMLButtonElement>(null);
  // Etter lagring er søket valgt og lagreknappen deaktivert, så fokus går til menyen som viser søket.
  const fokusEtterLagreDialog = useRef<HTMLButtonElement | null>(null);

  const søk = liste.data ?? [];
  const avvikerFraVanligSøk = harFilterEllerSøkeord(
    gjeldendeFilter,
    gjeldendeFritekst,
  );
  // Søket regnes som valgt bare så lenge filtrene og søkeordene er uendret.
  const valgtSøk = søk.find(
    (s) =>
      s.id === aktivtSøkId &&
      harSammeInnhold(s, gjeldendeFilter, gjeldendeFritekst, normaliserFilter),
  );
  // Uten et lagret standardsøk er vanlig søk standard. Vi venter på listen, så merket ikke blinker.
  const vanligSøkErStandard =
    liste.data !== undefined && !søk.some((s) => s.erStandard);
  const valgtVerdi = valgtSøk?.id ?? (avvikerFraVanligSøk ? '' : VANLIG_SØK);

  const lukkAdministrer = () => setAdministrerÅpen(false);

  const brukSøk = async (
    valgt: LagretSøkDTO,
    hendelse:
      'lagret_søk_brukt_fra_menyen' | 'lagret_søk_brukt_fra_administrasjon',
  ) => {
    if (!(await brukLagretSøk(valgt))) return;
    setForrigeSøkId(valgt.id);
    sporHendelse(hendelse);
  };

  const brukVanligSøk = (
    hendelse:
      'vanlig_søk_brukt_fra_menyen' | 'vanlig_søk_brukt_fra_administrasjon',
  ) => {
    onBrukVanligSøk();
    setForrigeSøkId(null);
    sporHendelse(hendelse);
  };

  return (
    <VStack gap='space-8'>
      <HStack align='center' wrap={false}>
        <ActionMenu open={menyÅpen} onOpenChange={setMenyÅpen}>
          <ActionMenu.Trigger>
            <Button
              ref={menyknappRef}
              size='xsmall'
              icon={<ChevronDownIcon aria-hidden />}
              iconPosition='right'
            >
              Lagrede søk
            </Button>
          </ActionMenu.Trigger>
          <ActionMenu.Content>
            <ActionMenu.RadioGroup label='Søk' value={valgtVerdi}>
              <ActionMenu.RadioItem
                value={VANLIG_SØK}
                onSelect={() => {
                  setMenyÅpen(false);
                  brukVanligSøk('vanlig_søk_brukt_fra_menyen');
                }}
              >
                <Menyrad
                  navn='Vanlig søk'
                  merknad={vanligSøkErStandard ? 'Standard' : ''}
                />
              </ActionMenu.RadioItem>
              {søk.length > 0 && <ActionMenu.Divider />}
              {søk.map((s) => (
                <ActionMenu.RadioItem
                  key={s.id}
                  value={s.id}
                  onSelect={() => {
                    setMenyÅpen(false);
                    brukSøk(s, 'lagret_søk_brukt_fra_menyen');
                  }}
                >
                  <Menyrad
                    navn={s.navn}
                    merknad={[
                      s.erStandard && 'Standard',
                      s.visSlettevarsel && 'Slettes snart',
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  />
                </ActionMenu.RadioItem>
              ))}
            </ActionMenu.RadioGroup>
            {søk.length === 0 && (
              <>
                <ActionMenu.Divider />
                <ActionMenu.Group label='Lagrede søk'>
                  {liste.isLoading && (
                    <ActionMenu.Item disabled>
                      Henter lagrede søk …
                    </ActionMenu.Item>
                  )}
                  {liste.error && !liste.data && (
                    <ActionMenu.Item disabled>
                      Kunne ikke hente lagrede søk
                    </ActionMenu.Item>
                  )}
                  {liste.data?.length === 0 && (
                    <ActionMenu.Item disabled>
                      <span className='flex flex-col'>
                        <span>Du har ingen lagrede søk</span>
                        <Detail as='span'>
                          Velg filtre og trykk på Lagre søk.
                        </Detail>
                      </span>
                    </ActionMenu.Item>
                  )}
                </ActionMenu.Group>
              </>
            )}
            <ActionMenu.Divider />
            <ActionMenu.Item
              icon={<CogIcon aria-hidden />}
              disabled={søk.length === 0}
              onSelect={() => setAdministrerÅpen(true)}
            >
              Administrer søk
            </ActionMenu.Item>
          </ActionMenu.Content>
        </ActionMenu>

        <Tooltip content='Lagre søk'>
          <Button
            ref={lagreknappRef}
            variant='tertiary'
            icon={<FloppydiskIcon aria-hidden />}
            disabled={!liste.data || !avvikerFraVanligSøk || !!valgtSøk}
            onClick={() => {
              fokusEtterLagreDialog.current = lagreknappRef.current;
              setLagreÅpen(true);
            }}
          />
        </Tooltip>
      </HStack>

      <div aria-live='polite'>
        {valgtSøk && (
          <BodyShort size='small'>
            Valgt søk: <strong>{valgtSøk.navn}</strong>
          </BodyShort>
        )}
      </div>

      {lagreÅpen && (
        <LagreSøkDialog
          domene={domene}
          forrigeSøkId={forrigeSøkId}
          gjeldendeFilter={gjeldendeFilter}
          gjeldendeFritekst={gjeldendeFritekst}
          normaliserFilter={normaliserFilter}
          onLagret={(lagret, type) => {
            void setAktivtSøkId(lagret.id);
            setForrigeSøkId(lagret.id);
            fokusEtterLagreDialog.current = menyknappRef.current;
            sporHendelse(
              type === 'nytt'
                ? 'lagret_søk_lagret_som_nytt'
                : 'lagret_søk_erstattet',
            );
          }}
          onClose={() => setLagreÅpen(false)}
          returnFocusTo={fokusEtterLagreDialog}
        />
      )}

      {administrerÅpen && (
        <AdministrerSøkDialog
          domene={domene}
          onBrukSøk={(valgt) => {
            lukkAdministrer();
            brukSøk(valgt, 'lagret_søk_brukt_fra_administrasjon');
          }}
          onBrukVanligSøk={() => {
            lukkAdministrer();
            brukVanligSøk('vanlig_søk_brukt_fra_administrasjon');
          }}
          onVanligSøkSattSomStandard={() =>
            sporHendelse('vanlig_søk_satt_som_standard')
          }
          onSattSomStandard={() => sporHendelse('lagret_søk_satt_som_standard')}
          onSlettet={(slettet) => {
            if (slettet.id === aktivtSøkId) void setAktivtSøkId(null);
            sporHendelse('lagret_søk_slettet');
          }}
          onClose={lukkAdministrer}
          returnFocusTo={menyknappRef}
        />
      )}
    </VStack>
  );
}
