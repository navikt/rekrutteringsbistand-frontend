import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { overtaEierskap } from '@/app/api/stilling/overta-eierskap/overtaEierskap';
import { kopierStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/kopier/[slug]/kopierStilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import {
  ArrowUndoIcon,
  EyeSlashIcon,
  MenuElipsisHorizontalIcon,
  PadlockLockedIcon,
  TabsAddIcon,
  TrashIcon,
} from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Button, Dropdown, Modal } from '@navikt/ds-react';
import { useState } from 'react';

export default function StillingDropdown() {
  const { erEier, erDirektemeldt, stillingsData, refetch, erFormidling } =
    useStillingsContext();

  const { brukerData, valgtNavKontor, visVarsel } = useApplikasjonContext();

  const [loading, setLoading] = useState(false);
  const [visAvpubliserModal, setVisAvpubliserModal] = useState(false);

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

  const avpubliserStilling = async () => {
    setVisAvpubliserModal(false);
    setLoading(true);
    await oppdaterStilling(
      {
        ...stillingsData,
        stilling: {
          ...stillingsData.stilling,
          status: StillingsStatus.Slettet,
        },
      },
      {
        eierNavident: brukerData.ident,
        eierNavn: brukerData.navn,
        eierNavKontorEnhetId: valgtNavKontor?.navKontor,
      },
    );
    setLoading(false);
    if (refetch) {
      refetch();
    }
  };

  return (
    <>
      <Dropdown>
        <Button
          loading={loading}
          variant='tertiary'
          icon={<MenuElipsisHorizontalIcon />}
          as={Dropdown.Toggle}
        />
        <Dropdown.Menu>
          <Dropdown.Menu.GroupedList>
            {(kanOvertaEksternStilling || kanOvertaStilling) && (
              <TilgangskontrollForInnhold
                skjulVarsel
                kreverEnAvRollene={[
                  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                ]}
              >
                <Dropdown.Menu.GroupedList.Item onClick={onOvertaStilling}>
                  <PadlockLockedIcon />
                  Ta over eierskap
                </Dropdown.Menu.GroupedList.Item>
              </TilgangskontrollForInnhold>
            )}
            <Dropdown.Menu.GroupedList.Item onClick={onKopierStilling}>
              <TabsAddIcon />
              Dupliser oppdraget
            </Dropdown.Menu.GroupedList.Item>

            <Dropdown.Menu.GroupedList.Item
              onClick={() => setVisAvpubliserModal(true)}
            >
              <TrashIcon />
              Avbryt oppdraget
            </Dropdown.Menu.GroupedList.Item>
          </Dropdown.Menu.GroupedList>
        </Dropdown.Menu>
      </Dropdown>

      {visAvpubliserModal && (
        <Modal
          onClose={() => setVisAvpubliserModal(false)}
          open={true}
          header={{
            heading: 'Avpubliser stillingsoppdraget',
            size: 'small',
          }}
          width='medium'
        >
          <Modal.Body>
            <div className='flex gap-2 flex-col'>
              <BodyShort>Hva som skjer</BodyShort>
              <div className='flex gap-2'>
                <EyeSlashIcon />
                <BodyLong>
                  Stillingsoppdraget skjules for andre i rekrutteringsbistand.
                </BodyLong>
              </div>
              <div className='flex gap-2'>
                <ArrowUndoIcon />
                <BodyLong>
                  Du kan publisere annonsen på nytt. Det gjør du ved å velge
                  &quot;Rediger&quot; på annonsen og fullføre flyten.
                </BodyLong>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type='button' variant='danger' onClick={avpubliserStilling}>
              Avpubliser annonsen
            </Button>
            <Button
              type='button'
              variant='secondary'
              onClick={() => setVisAvpubliserModal(true)}
            >
              Avbryt
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
