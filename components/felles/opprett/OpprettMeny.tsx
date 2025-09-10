import {
  opprettNyttRekrutteringstreff,
  OpprettNyttRekrutteringstreffDTO,
} from '@/app/api/rekrutteringstreff/nytt-rekrutteringstreff/opprettNyttRekrutteringstreff';
import { OpprettStillingProps } from '@/app/api/stilling/ny-stilling/opprettNyStilling';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import RekrutteringstreffFeatureToggle from '@/components/RekrutteringstreffFeatureToggle';
import { opprettOgNaviger } from '@/components/felles/opprett/opprett-ny';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useSidebar } from '@/components/ui/sidebar';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import { PlusIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import * as React from 'react';
import { useState } from 'react';

const OpprettMeny: React.FC = () => {
  const { open } = useSidebar();
  const { trackAndNavigate } = useUmami();
  const [loading, setLoading] = useState<boolean>(false);
  const { valgtNavKontor, brukerData } = useApplikasjonContext();

  const opprett = async (kategori: Stillingskategori) => {
    setLoading(true);
    const opprettProps: OpprettStillingProps = {
      kategori,
      eierNavKontorEnhetId: valgtNavKontor?.navKontor,
      navident: brukerData.ident,
      brukerNavn: `${brukerData.fornavn} ${brukerData.etternavn}`,
    };
    try {
      await opprettOgNaviger(opprettProps, trackAndNavigate);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ]}
    >
      <ActionMenu>
        <ActionMenu.Trigger>
          <Button
            loading={loading}
            size='small'
            className=' w-full'
            variant={open ? 'primary' : 'tertiary'}
            icon={<PlusIcon />}
          >
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
                onSelect={async () => {
                  await opprett(Stillingskategori.Stilling);
                }}
              >
                Stilling
              </ActionMenu.Item>
            </TilgangskontrollForInnhold>
            <TilgangskontrollForInnhold
              skjulVarsel
              kreverEnAvRollene={[
                Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
              ]}
            >
              <ActionMenu.Item
                onSelect={async () => {
                  await opprett(Stillingskategori.Jobbmesse);
                }}
              >
                Jobbmesse
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
                onSelect={async () => {
                  await opprett(Stillingskategori.Formidling);
                }}
              >
                Etterregistrering
              </ActionMenu.Item>
              <RekrutteringstreffFeatureToggle>
                <ActionMenu.Item
                  onSelect={() => {
                    const nyTreff: OpprettNyttRekrutteringstreffDTO = {
                      opprettetAvNavkontorEnhetId:
                        valgtNavKontor?.navKontor || null,
                    };
                    opprettNyttRekrutteringstreff(nyTreff)
                      .then((response) => {
                        const id = response.id;
                        trackAndNavigate(
                          UmamiEvent.Sidebar.opprettet_rekrutteringstreff,
                          `/rekrutteringstreff/${id}?mode=edit`,
                        );
                      })
                      .catch((error) => {
                        throw new RekbisError({
                          message:
                            'Feil ved opprettelse av nytt rekrutteringstreff:',
                          error,
                        });
                      });
                  }}
                >
                  Rekrutteringstreff
                </ActionMenu.Item>
              </RekrutteringstreffFeatureToggle>
            </TilgangskontrollForInnhold>
          </ActionMenu.Group>
        </ActionMenu.Content>
      </ActionMenu>
    </TilgangskontrollForInnhold>
  );
};

export default OpprettMeny;
