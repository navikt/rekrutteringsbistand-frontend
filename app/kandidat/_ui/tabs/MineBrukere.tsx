import {
  KandidatSøkPortefølje,
  useKandidatSøkFilterContext,
} from '@/app/kandidat/KandidaSokFilterContext';
import { Button } from '@navikt/ds-react';

export default function MineBrukere() {
  const { portefølje, setPortefølje } = useKandidatSøkFilterContext();
  return (
    <Button
      variant={
        portefølje === KandidatSøkPortefølje.MINE_BRUKERE
          ? 'primary'
          : 'tertiary'
      }
      onClick={() => setPortefølje(KandidatSøkPortefølje.MINE_BRUKERE)}
      size='xsmall'
      className={'tab-ellipsis'}
      title='Mine brukere'
      aria-label='Mine brukere'
    >
      Mine
    </Button>
  );
}
