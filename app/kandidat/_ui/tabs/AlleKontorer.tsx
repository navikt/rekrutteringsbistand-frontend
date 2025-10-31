import {
  KandidatSøkPortefølje,
  useKandidatSøkFilterContext,
} from '@/app/kandidat/KandidaSokFilterContext';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { Button } from '@navikt/ds-react';

export default function AlleKontorer() {
  const { portefølje, setPortefølje } = useKandidatSøkFilterContext();
  return (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ]}
    >
      <Button
        variant={
          portefølje === KandidatSøkPortefølje.ALLE ? 'primary' : 'tertiary'
        }
        onClick={() => setPortefølje(KandidatSøkPortefølje.ALLE)}
        size='xsmall'
        className={'tab-ellipsis'}
        title='Alle kontorer'
        aria-label='Alle kontorer'
      >
        Alle
      </Button>
    </TilgangskontrollForInnhold>
  );
}
