import { useSidebar } from '../../../../components/ui/sidebar';
import { UmamiEvent } from '../../../../util/umamiEvents';
import { useUmami } from '../../../providers/UmamiContext';
import { TilgangskontrollForInnhold } from '../../tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../tilgangskontroll/roller';
import { PlusIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import * as React from 'react';

const OpprettKnapp: React.FC = () => {
  const { open } = useSidebar();
  const { trackAndNavigate } = useUmami();

  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button variant={open ? 'secondary' : 'tertiary'} icon={<PlusIcon />}>
          {open && 'Opprett'}
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label={`Opprett ny`}>
          <TilgangskontrollForInnhold
            skjulVarsel
            kreverEnAvRollene={[
              Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            ]}
          >
            <ActionMenu.Item
              onSelect={() =>
                trackAndNavigate(
                  UmamiEvent.Sidebar.opprettet_stilling,
                  '/stilling/ny-stilling',
                )
              }
            >
              Stilling
            </ActionMenu.Item>
          </TilgangskontrollForInnhold>
          <TilgangskontrollForInnhold
            skjulVarsel
            kreverEnAvRollene={[
              Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
              Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            ]}
          >
            <ActionMenu.Item
              onSelect={() =>
                trackAndNavigate(
                  UmamiEvent.Sidebar.opprettet_etterregistrering,
                  '/etterregistrering/ny-etterregistrering',
                )
              }
            >
              Etterregistrering
            </ActionMenu.Item>
          </TilgangskontrollForInnhold>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};

export default OpprettKnapp;
