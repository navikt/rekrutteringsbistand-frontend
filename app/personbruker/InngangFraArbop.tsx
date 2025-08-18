'use client';

import { useArenaKandidatnr } from '../api/kandidat-sok/useArenaKandidatnr';
import { useSynlighetsevaluering } from '../api/synlighet/evaluering/useSynlighetsevaluering';
import Sidelaster from '../components/Sidelaster';
import { useApplikasjonContext } from '../providers/ApplikasjonContext';
import Forvirretblob from '../../public/illustrasjoner/feilmelding-blob.svg'
import { Button, Heading } from '@navikt/ds-react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import Image from 'next/image';

const navetUrl = 'https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Hvorfor-er-ikke-personen-synlig-i-Rekr.aspx';
const portenUrl = 'https://jira.adeo.no/plugins/servlet/desk/portal/541/create/1904';

const InngangFraArbop: React.FC = () => {
  const { valgtFnr } = useApplikasjonContext();
  const kandidatnrHook = useArenaKandidatnr(valgtFnr);
  const synlighetHook = useSynlighetsevaluering(valgtFnr);

  const router = useRouter();

  React.useEffect(() => {
    if (
      kandidatnrHook.data &&
      kandidatnrHook.data.arenaKandidatnr &&
      synlighetHook.data
    ) {
      router.push(
        `/stilling?visKandidatnr=${kandidatnrHook.data.arenaKandidatnr}`,
      );
    }
  }, [kandidatnrHook.data, synlighetHook.data, router]);

  if (synlighetHook.isLoading && kandidatnrHook.isLoading) {
    return <Sidelaster />;
  }

  return (
    <div>{(!kandidatnrHook.data || !kandidatnrHook.data.arenaKandidatnr || !synlighetHook.data || !valgtFnr) && (
        <div className={'mt-4 max-w-2xl m-auto flex flex-col flex-wrap gap-4'}>
          <div className={'flex-1 flex flex-row gap-8 mt-10 items-center'}>
            <Heading level='2' size='large' className={'flex-1 w-96'}>
              Personen vises ikke i rekrutteringsbistand
            </Heading>
            <Image src={Forvirretblob} alt={'En figur som ser forvirret ut'}></Image>
          </div>
          <p>Ikke alle personer kan vises i rekrutteringsbistand. For at de skal dukke opp
            er det noen regler som må oppfylles først. De finner du her:
          </p>
          <Button variant={'secondary-neutral'}
                  size={'small'}
                  icon={<ArrowRightIcon aria-hidden />}
                  iconPosition={'right'}
                  onClick={() => window.open(navetUrl, '_blank')}
                  style={{width: '224px', height: '48px'}}

          >
            Vis reglene på navet
          </Button>
          <p>Siden vi ikke kan behandle opplysninger om den du prøver å finne, kan vi dessverre ikke
            hjelpe deg med å vise <span className={'italic'}>akkurat</span> hva som mangler 😥. Det pleier ofte å være at de bare
            mangler jobbprofilen i CVen, så sjekk gjerne det først.
          </p>
          <p className={'text-xl mt-4 font-semibold'}>Jeg har sjekket alt som ble nevnt på Navet, men personen
            vises fortsatt ikke. Hva gjør jeg nå?
          </p>
          <p>Hvis punktene er oppfylt, men personen fortsatt ikke dukker opp, kan du opprette en melding i
            Porten. Der rapporterer du feilen sånn at vi kan følge den opp.
          </p>
          <Button variant={'secondary-neutral'}
                  size={'small'}
                  icon={<ArrowRightIcon aria-hidden />}
                  iconPosition={'right'}
                  onClick={() => window.open(portenUrl, '_blank')}
                  style={{width: '283px', height: '48px'}}

          >
            Opprett en melding i Porten
          </Button>
        </div>
    )}
    </div>
  )
};

export default InngangFraArbop;
