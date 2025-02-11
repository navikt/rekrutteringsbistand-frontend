import {
  EyeIcon,
  FloppydiskIcon,
  StopIcon,
  TrashIcon,
} from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';
import { oppdaterStilling } from '../../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { useStilling } from '../../../../api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { useVisVarsling } from '../../../../components/varsling/Varsling';
import { StillingsStatus } from '../../../stilling-typer';
import { useStillingsContext } from '../../StillingsContext';
import { mapFormTilStilling } from '../mapStilling';
import { StillingsDataForm } from '../redigerFormType.zod';
import EndreStillingStatus from './EndreStillingStatus';

export interface AksjonsknapperSiderbarStillingProps {
  formVerdier: StillingsDataForm;
}

const AksjonsknapperSiderbarStilling: React.FC<
  AksjonsknapperSiderbarStillingProps
> = ({ formVerdier }) => {
  const { setForhåndsvisData, forhåndsvisData, stillingsData } =
    useStillingsContext();
  const [lagrer, setLagrer] = React.useState<boolean>(false);

  const { mutate } = useStilling(stillingsData.stilling.uuid);

  const visVarsling = useVisVarsling();

  const onLagre = async () => {
    setLagrer(true);

    const nyStillingsData = mapFormTilStilling(formVerdier, stillingsData);

    try {
      await oppdaterStilling(nyStillingsData);

      visVarsling({
        innhold: 'Stillingen ble lagret',
        alertType: 'success',
      });
      await mutate();
    } catch (error) {
      visVarsling({
        innhold: 'Feil ved lagring av stilling',
        alertType: 'error',
      });
    }

    setLagrer(false);
  };

  return (
    <div className='sticky top-4 self-start flex flex-col gap-2 items-start'>
      <Button
        loading={lagrer}
        icon={<FloppydiskIcon />}
        variant='tertiary'
        onClick={onLagre}
      >
        Lagre
      </Button>
      <Button
        icon={<EyeIcon />}
        onClick={() => {
          const stilling = mapFormTilStilling(formVerdier, stillingsData);
          setForhåndsvisData({
            stillingsinfo: stillingsData?.stillingsinfo ?? null,
            stilling: {
              ...stilling.stilling,
              properties: {
                ...stilling.stilling?.properties,
                applicationemail:
                  stilling.stilling?.properties?.applicationemail ?? null,
                applicationurl:
                  stilling.stilling?.properties?.applicationurl ?? null,
              },
              categoryList: stilling.stilling?.categoryList?.filter(
                (
                  category,
                ): category is {
                  code: string | null;
                  id: number | null;
                  name: string | null;
                  categoryType: string | null;
                  description: string | null;
                  parentId: number | null;
                } => 'code' in category,
              ),
            },
          });
        }}
        variant='tertiary'
      >
        Forhåndsvis
      </Button>
      <EndreStillingStatus
        nyStatus={StillingsStatus.Stoppet}
        knappNavn='Stopp'
        knappIkon={<StopIcon />}
        tekst='Er du sikker på at du vil STOPPE stillingen?'
      />
      <EndreStillingStatus
        nyStatus={StillingsStatus.Slettet}
        knappNavn='Slett'
        knappIkon={<TrashIcon />}
        tekst='Er du sikker på at du vil SLETTE stillingen?'
      />
    </div>
  );
};

export default AksjonsknapperSiderbarStilling;
