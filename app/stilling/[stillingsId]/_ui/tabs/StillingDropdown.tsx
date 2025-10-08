import { overtaEierskap } from '@/app/api/stilling/overta-eierskap/overtaEierskap';
import { slettStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/slett-stilling';
import { kopierStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/kopier/[slug]/kopierStilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
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
    await slettStilling(stillingsData.stilling.uuid);
    setLoading(false);
    if (refetch) {
      refetch();
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

              <Dropdown.Menu.GroupedList.Item
                onClick={() => setVisAvpubliserModal(true)}
              >
                <TrashIcon />
                Avbryt oppdraget
              </Dropdown.Menu.GroupedList.Item>
            </Dropdown.Menu.GroupedList>
          </Dropdown.Menu>
        </Dropdown>
      </TilgangskontrollForInnhold>

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
                  Du kan publisere oppdraget på nytt. Det gjør du ved å velge
                  &quot;Rediger&quot; på oppdraget og fullføre flyten.
                </BodyLong>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type='button' variant='danger' onClick={avpubliserStilling}>
              Avpubliser oppdraget
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
