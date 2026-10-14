import {
  opprettRekrutteringstreff,
  OpprettRekrutteringstreffDTO,
} from '@/app/api/rekrutteringstreff/mutations';
import { OpprettStillingProps } from '@/app/api/stilling/ny-stilling/opprettNyStilling';
import { RekrutteringstreffKategori } from '@/app/rekrutteringstreff/_types/constants';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import OpprettInfoDialog, {
  OpprettInfoType,
} from '@/components/opprett/OpprettInfoDialog';
import { opprettOgNaviger } from '@/components/opprett/opprett-ny';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useSidebar } from '@/components/ui/sidebar';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { formaterAnsattNavn } from '@/util/ansattNavn';
import { getMiljø, Miljø } from '@/util/miljø';
import { RekbisError } from '@/util/rekbisError';
import { UmamiEvent } from '@/util/umamiEvents';
import { PlusIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import * as React from 'react';
import { useState } from 'react';

const OpprettMeny: React.FC = () => {
  const { open } = useSidebar();
  const { trackAndNavigate } = useUmami();
  const [loading, setLoading] = useState<boolean>(false);
  const { valgtNavKontor, brukerData } = useApplikasjonContext();
  const [infoType, setInfoType] = useState<OpprettInfoType | null>(null);

  const opprettTreff = async () => {
    const nyttTreff: OpprettRekrutteringstreffDTO = {
      opprettetAvNavkontorEnhetId: valgtNavKontor?.navKontor || null,
      tittel: 'Treff uten navn',
      eierNavn: formaterAnsattNavn(brukerData),
    };
    try {
      const response = await opprettRekrutteringstreff(nyttTreff);
      trackAndNavigate(
        UmamiEvent.Sidebar.opprettet_rekrutteringstreff,
        `/rekrutteringstreff/${response.id}/rediger`,
      );
    } catch (error) {
      throw new RekbisError({
        message: 'Feil ved opprettelse av nytt rekrutteringstreff:',
        error,
      });
    }
  };

  const opprettStilling = async (kategori: Stillingskategori) => {
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

  const bekreftOpprett = () =>
    infoType === 'rekrutteringstreff'
      ? opprettTreff()
      : opprettStilling(Stillingskategori.Stilling);

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
            className='w-full'
            variant={open ? 'primary' : 'tertiary'}
            icon={<PlusIcon />}
          >
            {open && 'Opprett'}
          </Button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Group label={`Opprett`}>
            {getMiljø() !== Miljø.ProdGcp && (
              <TilgangskontrollForInnhold
                skjulVarsel
                kreverEnAvRollene={[
                  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                ]}
              >
                <ActionMenu.Item
                  onSelect={() => {
                    const nyttWorkOp: OpprettRekrutteringstreffDTO = {
                      opprettetAvNavkontorEnhetId:
                        valgtNavKontor?.navKontor || null,
                      tittel: 'WorkOp uten navn',
                      kategori: RekrutteringstreffKategori.WORKOP,
                      eierNavn: formaterAnsattNavn(brukerData),
                    };
                    opprettRekrutteringstreff(nyttWorkOp)
                      .then((response) => {
                        const id = response.id;
                        trackAndNavigate(
                          UmamiEvent.Sidebar.opprettet_workop,
                          `/rekrutteringstreff/${id}/rediger`,
                        );
                      })
                      .catch((error) => {
                        throw new RekbisError({
                          message: 'Feil ved opprettelse av nytt WorkOp:',
                          error,
                        });
                      });
                  }}
                >
                  WorkOp
                </ActionMenu.Item>
              </TilgangskontrollForInnhold>
            )}
            <TilgangskontrollForInnhold
              skjulVarsel
              kreverEnAvRollene={[
                Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
              ]}
            >
              <ActionMenu.Item
                onSelect={() => setInfoType('rekrutteringstreff')}
              >
                Rekrutteringstreff
              </ActionMenu.Item>
            </TilgangskontrollForInnhold>
            <TilgangskontrollForInnhold
              skjulVarsel
              kreverEnAvRollene={[
                Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
              ]}
            >
              <ActionMenu.Item onSelect={() => setInfoType('stillingsoppdrag')}>
                Stillingsoppdrag
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
                  await opprettStilling(Stillingskategori.Jobbmesse);
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
                  await opprettStilling(Stillingskategori.Formidling);
                }}
              >
                Etterregistrering
              </ActionMenu.Item>
            </TilgangskontrollForInnhold>
          </ActionMenu.Group>
        </ActionMenu.Content>
      </ActionMenu>
      {infoType && (
        <OpprettInfoDialog
          type={infoType}
          åpen
          onBekreft={bekreftOpprett}
          onLukk={() => setInfoType(null)}
        />
      )}
    </TilgangskontrollForInnhold>
  );
};

export default OpprettMeny;
