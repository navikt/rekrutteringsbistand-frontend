import { overtaEierskap } from '@/app/api/stilling/overta-eierskap/overtaEierskap';
import { kopierStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/kopier/[slug]/kopierStilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import SlettOppdragModal from '@/app/stilling/[stillingsId]/_ui/tabs/SlettOppdragModal';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import {
  MenuElipsisHorizontalIcon,
  PadlockLockedIcon,
  TabsAddIcon,
  TrashIcon,
} from '@navikt/aksel-icons';
import { Button, Dropdown } from '@navikt/ds-react';
import { useState } from 'react';

export default function StillingDropdown() {
  const { erEier, erDirektemeldt, stillingsData, refetch, erFormidling } =
    useStillingsContext();

  const { brukerData, valgtNavKontor, visVarsel } = useApplikasjonContext();

  const [loading, setLoading] = useState(false);
  const [visSlettModal, setVisSlettModal] = useState(false);

  const harStillingsinfo = stillingsData.stillingsinfo !== null;

  const kanOvertaEksternStilling =
    harStillingsinfo &&
    !erEier &&
    !erDirektemeldt &&
    stillingsData.stilling.employer?.orgnr;

  const kanOvertaStilling = !erFormidling && erDirektemeldt && !erEier;

  const onOvertaStilling = async () => {
    setLoading(true);
    try {
      await overtaEierskap({
        stillingsid: stillingsData.stilling.uuid,
        eierNavident: brukerData.ident,
        eierNavn: brukerData.navn,
        eierNavKontorEnhetId: valgtNavKontor?.navKontor,
      });
      refetch?.();
    } catch (error) {
      new RekbisError({ message: 'Feil ved overta stilling', error });
    } finally {
      setLoading(false);
    }
  };

  const onKopierStilling = async () => {
    try {
      setLoading(true);
      await kopierStilling(stillingsData.stilling.uuid);

      visVarsel({
        tekst: 'Stilling er duplisert',
        type: 'success',
      });
    } catch (error) {
      new RekbisError({
        message: 'Feil ved duplisering av stilling',
        error,
      });
      visVarsel({
        tekst: 'Feil ved duplisering av stilling',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TilgangskontrollForInnhold
        skjulVarsel
        kreverEnAvRollene={[
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
        ]}
      >
        <Dropdown>
          <Button
            size='small'
            loading={loading}
            variant='tertiary'
            icon={<MenuElipsisHorizontalIcon />}
            as={Dropdown.Toggle}
          />
          <Dropdown.Menu>
            <Dropdown.Menu.GroupedList>
              {(kanOvertaEksternStilling || kanOvertaStilling) && (
                <Dropdown.Menu.GroupedList.Item onClick={onOvertaStilling}>
                  <PadlockLockedIcon />
                  Ta over eierskap
                </Dropdown.Menu.GroupedList.Item>
              )}
              <Dropdown.Menu.GroupedList.Item onClick={onKopierStilling}>
                <TabsAddIcon />
                Dupliser oppdraget
              </Dropdown.Menu.GroupedList.Item>

              {erDirektemeldt &&
                stillingsData.stilling.status !== StillingsStatus.Slettet && (
                  <Dropdown.Menu.GroupedList.Item
                    onClick={() => setVisSlettModal(true)}
                  >
                    <TrashIcon />
                    Slett oppdraget
                  </Dropdown.Menu.GroupedList.Item>
                )}
            </Dropdown.Menu.GroupedList>
          </Dropdown.Menu>
        </Dropdown>
        {visSlettModal && <SlettOppdragModal setVisModal={setVisSlettModal} />}
      </TilgangskontrollForInnhold>
    </>
  );
}
