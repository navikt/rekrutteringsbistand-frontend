'use client';

import AdministrerStandardsøkModal from './AdministrerStandardsøkModal';
import LagreStandardsøkModal from './LagreStandardsøkModal';
import {
  type StandardsøkDomene,
  type StandardsøkDTO,
} from '@/app/api/bruker/standardsok/standardsøkTyper';
import { useStandardsøk } from '@/app/api/bruker/standardsok/useStandardsøk';
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
import { useEffect, useRef, useState } from 'react';

export type StandardsøkHendelse =
  | 'lagret_nytt'
  | 'erstattet'
  | 'slettet'
  | 'satt_som_standard'
  | 'vanlig_søk_satt_som_standard';

export type StandardsøkKilde = 'meny' | 'administrasjon';

export interface StandardsøkKnapperProps {
  domene: StandardsøkDomene;
  /** Query-streng med filtrene som lagres, uten fritekst. */
  gjeldendeFilter: string;
  gjeldendeFritekst: string[];
  aktivtSøkId: string | null;
  onBrukSøk: (søk: StandardsøkDTO, kilde: StandardsøkKilde) => void;
  /**
   * Tar i bruk «Vanlig søk», som er standard når ingen lagrede søk er standard.
   * Skal nullstille filtre og søkeord, så domenets standardverdier gjelder.
   */
  onBrukVanligSøk: (kilde: StandardsøkKilde) => void;
  onLagret: (søk: StandardsøkDTO) => void;
  onSlettet: (søk: StandardsøkDTO) => void;
  onHendelse?: (hendelse: StandardsøkHendelse) => void;
}

const VANLIG_SØK = 'vanlig-sok';

const sammeSøkeord = (a: string[], b: string[]) =>
  a.length === b.length && a.every((ord, i) => ord === b[i]);

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
 * Felles meny og lagreknapp for lagrede søk. Domenet bestemmer hvilke filtre som lagres,
 * og hvordan et søk tas i bruk.
 */
export default function StandardsøkKnapper({
  domene,
  gjeldendeFilter,
  gjeldendeFritekst,
  aktivtSøkId,
  onBrukSøk,
  onBrukVanligSøk,
  onLagret,
  onSlettet,
  onHendelse,
}: StandardsøkKnapperProps) {
  const liste = useStandardsøk(domene);
  const [lagreÅpen, setLagreÅpen] = useState(false);
  const [administrerÅpen, setAdministrerÅpen] = useState(false);
  const [menyÅpen, setMenyÅpen] = useState(false);
  const menyknappRef = useRef<HTMLButtonElement>(null);
  const lagreknappRef = useRef<HTMLButtonElement>(null);
  const fokusEtterLukking = useRef<HTMLButtonElement | null>(null);

  // Dialogene fjernes fra DOM-en når de lukkes. Effekten kjører etter at React har fjernet dem,
  // og flytter fokus tilbake til knappen som åpnet dialogen.
  useEffect(() => {
    if (lagreÅpen || administrerÅpen) return;
    fokusEtterLukking.current?.focus();
    fokusEtterLukking.current = null;
  }, [lagreÅpen, administrerÅpen]);

  const søk = liste.data ?? [];
  const harFilterEllerSøkeord =
    gjeldendeFilter !== '' || gjeldendeFritekst.length > 0;
  // Søket regnes som valgt bare så lenge filtrene og søkeordene er uendret.
  const valgtSøk = søk.find(
    (s) =>
      s.id === aktivtSøkId &&
      s.filter === gjeldendeFilter &&
      sammeSøkeord(s.fritekst, gjeldendeFritekst),
  );
  // Uten et lagret standardsøk er vanlig søk standard. Vi venter på listen, så merket ikke blinker.
  const vanligSøkErStandard =
    liste.data !== undefined && !søk.some((s) => s.erStandard);
  const valgtVerdi = valgtSøk?.id ?? (harFilterEllerSøkeord ? '' : VANLIG_SØK);

  const lukkLagre = () => {
    setLagreÅpen(false);
    fokusEtterLukking.current = lagreknappRef.current;
  };

  const lukkAdministrer = () => {
    setAdministrerÅpen(false);
    fokusEtterLukking.current = menyknappRef.current;
  };

  return (
    <VStack gap='space-8'>
      {/* Samme knapper og størrelser som «Bruk standardsøk» i stillingssøket. */}
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
                  onBrukVanligSøk('meny');
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
                    onBrukSøk(s, 'meny');
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
            disabled={!liste.data || !harFilterEllerSøkeord}
            onClick={() => setLagreÅpen(true)}
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
        <LagreStandardsøkModal
          domene={domene}
          søk={søk}
          valgtSøk={valgtSøk}
          gjeldendeFilter={gjeldendeFilter}
          gjeldendeFritekst={gjeldendeFritekst}
          onLagret={(lagret, type) => {
            onLagret(lagret);
            onHendelse?.(type === 'nytt' ? 'lagret_nytt' : 'erstattet');
          }}
          onClose={lukkLagre}
        />
      )}

      {administrerÅpen && (
        <AdministrerStandardsøkModal
          domene={domene}
          søk={søk}
          onBrukSøk={(valgt) => {
            lukkAdministrer();
            onBrukSøk(valgt, 'administrasjon');
          }}
          onBrukVanligSøk={() => {
            lukkAdministrer();
            onBrukVanligSøk('administrasjon');
          }}
          onVanligSøkSattSomStandard={() =>
            onHendelse?.('vanlig_søk_satt_som_standard')
          }
          onSattSomStandard={() => onHendelse?.('satt_som_standard')}
          onSlettet={(slettet) => {
            onSlettet(slettet);
            onHendelse?.('slettet');
          }}
          onClose={lukkAdministrer}
        />
      )}
    </VStack>
  );
}
