'use client';

import AdministrerStandardsøkModal from './AdministrerStandardsøkModal';
import LagreStandardsøkModal from './LagreStandardsøkModal';
import {
  type StandardsøkDomene,
  type StandardsøkDTO,
} from '@/app/api/bruker/standardsok/standardsøkTyper';
import { useStandardsøk } from '@/app/api/bruker/standardsok/useStandardsøk';
import { formaterStandardsøkDato } from '@/components/standardsøk/standardsøkDato';
import {
  ChevronDownIcon,
  CogIcon,
  FloppydiskIcon,
  StarFillIcon,
} from '@navikt/aksel-icons';
import { ActionMenu, Button, Detail, Tooltip } from '@navikt/ds-react';
import { useState } from 'react';

export type StandardsøkHendelse =
  | 'lagret_nytt'
  | 'erstattet'
  | 'slettet'
  | 'satt_som_standard';

export interface StandardsøkKnapperProps {
  domene: StandardsøkDomene;
  /** Query-streng med filtrene som lagres, uten fritekst. */
  gjeldendeFilter: string;
  gjeldendeFritekst: string[];
  aktivtSøkId: string | null;
  onBrukSøk: (søk: StandardsøkDTO) => void;
  onLagret: (søk: StandardsøkDTO) => void;
  onSlettet: (søk: StandardsøkDTO) => void;
  onHendelse?: (hendelse: StandardsøkHendelse) => void;
}

/**
 * Felles meny og lagre-knapp for lagrede søk. Domenet bestemmer hvilke filtre som lagres,
 * og hvordan et søk tas i bruk.
 */
export default function StandardsøkKnapper({
  domene,
  gjeldendeFilter,
  gjeldendeFritekst,
  aktivtSøkId,
  onBrukSøk,
  onLagret,
  onSlettet,
  onHendelse,
}: StandardsøkKnapperProps) {
  const liste = useStandardsøk(domene);
  const [lagreÅpen, setLagreÅpen] = useState(false);
  const [administrerÅpen, setAdministrerÅpen] = useState(false);

  const søk = liste.data ?? [];
  const harFilterEllerSøkeord =
    gjeldendeFilter !== '' || gjeldendeFritekst.length > 0;

  return (
    <div className='flex flex-nowrap items-center gap-1'>
      <ActionMenu>
        <ActionMenu.Trigger>
          <Button
            size='xsmall'
            variant='secondary'
            icon={<ChevronDownIcon aria-hidden />}
            iconPosition='right'
          >
            Lagrede søk
          </Button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Group label='Lagrede søk'>
            {liste.isLoading && (
              <ActionMenu.Item disabled>Henter lagrede søk …</ActionMenu.Item>
            )}
            {liste.error && !liste.data && (
              <ActionMenu.Item disabled>
                Kunne ikke hente lagrede søk
              </ActionMenu.Item>
            )}
            {liste.data?.length === 0 && (
              <ActionMenu.Item disabled>
                Du har ingen lagrede søk
              </ActionMenu.Item>
            )}
            {søk.map((s) => (
              <ActionMenu.Item
                key={s.id}
                onSelect={() => onBrukSøk(s)}
                icon={
                  s.erStandard ? <StarFillIcon title='Standardsøk' /> : undefined
                }
              >
                <span className='flex flex-col'>
                  <span>{s.navn}</span>
                  {s.visSlettevarsel && (
                    <Detail as='span' textColor='subtle'>
                      Slettes {formaterStandardsøkDato(s.slettes)}
                    </Detail>
                  )}
                </span>
              </ActionMenu.Item>
            ))}
          </ActionMenu.Group>
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
          size='xsmall'
          variant='tertiary'
          icon={<FloppydiskIcon title='Lagre søk' />}
          disabled={!liste.data || !harFilterEllerSøkeord}
          onClick={() => setLagreÅpen(true)}
        />
      </Tooltip>

      {lagreÅpen && (
        <LagreStandardsøkModal
          domene={domene}
          søk={søk}
          aktivtSøkId={aktivtSøkId}
          gjeldendeFilter={gjeldendeFilter}
          gjeldendeFritekst={gjeldendeFritekst}
          onLagret={(lagret, type) => {
            onLagret(lagret);
            onHendelse?.(type === 'nytt' ? 'lagret_nytt' : 'erstattet');
          }}
          onClose={() => setLagreÅpen(false)}
        />
      )}

      {administrerÅpen && (
        <AdministrerStandardsøkModal
          domene={domene}
          søk={søk}
          onSattSomStandard={() => onHendelse?.('satt_som_standard')}
          onSlettet={(slettet) => {
            onSlettet(slettet);
            onHendelse?.('slettet');
          }}
          onClose={() => setAdministrerÅpen(false)}
        />
      )}
    </div>
  );
}
