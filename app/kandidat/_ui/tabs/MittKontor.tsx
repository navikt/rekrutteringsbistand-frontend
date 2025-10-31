import {
  KandidatSøkPortefølje,
  useKandidatSøkFilterContext,
} from '@/app/kandidat/KandidaSokFilterContext';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { Button } from '@navikt/ds-react';

export default function MittKontor() {
  const { valgtNavKontor } = useApplikasjonContext();
  const { portefølje, setPortefølje } = useKandidatSøkFilterContext();
  if (!valgtNavKontor) return null;
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
          portefølje === KandidatSøkPortefølje.MITT_KONTOR
            ? 'primary'
            : 'tertiary'
        }
        onClick={() => setPortefølje(KandidatSøkPortefølje.MITT_KONTOR)}
        size='xsmall'
        className={'tab-ellipsis'}
        title='Mitt kontor'
        aria-label='Mitt kontor'
      >
        Mitt kontor
      </Button>
    </TilgangskontrollForInnhold>
  );
}
