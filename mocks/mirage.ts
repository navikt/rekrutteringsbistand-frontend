'use client';
import { createServer } from 'miragejs';
import { brukerMirage } from '../app/api/bruker/useBruker';
import { foresporselOmDelingAvCVStatistikkMirage } from '../app/api/foresporsel-om-deling-av-cv/statistikk/useForesporselOmdelingAvCV';
import { kandidatSokMirage } from '../app/api/kandidat-sok/useKandidatsøk';
import { antallKandidaterMirage } from '../app/api/kandidat/useAntallKandidater';
import { kandidatlisteMirage } from '../app/api/kandidat/useKandidatliste';
import { kandidatlisteIdMirage } from '../app/api/kandidat/useKandidatlisteId';
import { statistikkMirage } from '../app/api/statistikk/useStatistikk';
import { geografiMirage } from '../app/api/stilling/geografi/useGeografi';
import { stillingMirage } from '../app/api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';

createServer({
  routes() {
    brukerMirage(this);
    kandidatlisteIdMirage(this);
    geografiMirage(this);
    kandidatlisteMirage(this);
    antallKandidaterMirage(this);
    kandidatSokMirage(this);
    statistikkMirage(this);
    foresporselOmDelingAvCVStatistikkMirage(this);
    stillingMirage(this);

    this.passthrough('/api/stillings-sok');
  },
});
