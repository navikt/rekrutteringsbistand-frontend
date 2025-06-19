import { RekbisError } from '../../../../../util/rekbisError';
import { oppdaterStilling } from '../../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { useStilling } from '../../../../api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { useApplikasjonContext } from '../../../../providers/ApplikasjonContext';
import { StillingsStatus } from '../../../stilling-typer';
import { useStillingsContext } from '../../StillingsContext';
import { mapFormTilStilling } from '../mapStilling';
import { StillingsDataForm } from '../redigerFormType.zod';
import EndreStillingStatus from './EndreStillingStatus';
import { EyeIcon, FloppydiskIcon, TrashIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

export interface AksjonsknapperSiderbarStillingProps {
  formVerdier: StillingsDataForm;
}

const AksjonsknapperSiderbarStilling: React.FC<
  AksjonsknapperSiderbarStillingProps
> = ({ formVerdier }) => {
  const { setForhåndsvisData, stillingsData } = useStillingsContext();
  const [lagrer, setLagrer] = React.useState<boolean>(false);
  const { visVarsel, valgtNavKontor, brukerData } = useApplikasjonContext();
  const { mutate } = useStilling(stillingsData.stilling.uuid);

  const onLagre = async () => {
    setLagrer(true);

    const nyStillingsData = mapFormTilStilling(formVerdier, stillingsData);

    try {
      await oppdaterStilling(nyStillingsData, {
        eierNavident: brukerData.ident,
        eierNavn: brukerData.navn,
        eierNavKontorEnhetId: valgtNavKontor?.navKontor,
      });

      visVarsel({
        tekst: 'Stillingen ble lagret',
        type: 'success',
      });
      await mutate();
    } catch (error) {
      new RekbisError({ message: 'Feil ved lagring av stilling', error });
      visVarsel({
        tekst: 'Feil ved lagring av stilling',
        type: 'error',
      });
    }

    setLagrer(false);
  };

  return (
    <div className='sticky top-4 flex flex-col items-start gap-2 self-start'>
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
        nyStatus={StillingsStatus.Slettet}
        knappNavn='Slett'
        knappIkon={<TrashIcon />}
        tekst={''}
      />
    </div>
  );
};

export default AksjonsknapperSiderbarStilling;
