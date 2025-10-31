import {
  KandidatSøkPortefølje,
  useKandidatSøkFilterContext,
} from '@/app/kandidat/KandidaSokFilterContext';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { Button } from '@navikt/ds-react';

export default function MineKontorer() {
  const { portefølje, setPortefølje } = useKandidatSøkFilterContext();
  const { brukerData } = useApplikasjonContext();
  if (!(brukerData?.enheter && brukerData.enheter.length > 1)) return null;
  return (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      <Button
        variant={
          portefølje === KandidatSøkPortefølje.MINE_KONTORER
            ? 'primary'
            : 'tertiary'
        }
        onClick={() => setPortefølje(KandidatSøkPortefølje.MINE_KONTORER)}
        size='xsmall'
        className={'tab-ellipsis'}
        title='Mine kontorer'
        aria-label='Mine kontorer'
      >
        Mine kontorer
      </Button>
    </TilgangskontrollForInnhold>
  );
}
