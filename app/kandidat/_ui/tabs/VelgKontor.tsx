import {
  KandidatSøkPortefølje,
  useKandidatSøkFilterContext,
} from '@/app/kandidat/KandidaSokFilterContext';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { Button } from '@navikt/ds-react';

export default function VelgKontor() {
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
          portefølje === KandidatSøkPortefølje.VALGTE_KONTORER
            ? 'primary'
            : 'tertiary'
        }
        onClick={() => setPortefølje(KandidatSøkPortefølje.VALGTE_KONTORER)}
        size='xsmall'
        className={'tab-ellipsis'}
        title='Valgte kontorer'
        aria-label='Valgte kontorer'
      >
        Velg kontor
      </Button>
    </TilgangskontrollForInnhold>
  );
}
