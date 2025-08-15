'use client';

import { useArenaKandidatnr } from '../api/kandidat-sok/useArenaKandidatnr';
import { useSynlighetsevaluering } from '../api/synlighet/evaluering/useSynlighetsevaluering';
import Sidelaster from '../components/Sidelaster';
import HvitKort from '../components/layout/HvitKort';
import SideLayout from '../components/layout/SideLayout';
import { useApplikasjonContext } from '../providers/ApplikasjonContext';
import Forvirretblob from '../../public/illustrasjoner/feilmelding-blob.svg'
import { BodyLong, Button, Heading } from '@navikt/ds-react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import Image from 'next/image';

const InngangFraArbop: React.FC = () => {
  const { valgtFnr } = useApplikasjonContext();
  const kandidatnrHook = useArenaKandidatnr(valgtFnr);
  const synlighetHook = useSynlighetsevaluering(valgtFnr);

  const router = useRouter();

  const handleBackClick = () => {
    window.history.back();
  };

  const TilbakeKnapp = () => (
    <Button
      variant='tertiary'
      icon={<ArrowLeftIcon aria-hidden />}
      onClick={handleBackClick}
      style={{ marginBottom: '1rem' }}
    >
      Tilbake
    </Button>
  );

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


  if (!valgtFnr) {
    return (
      <SideLayout>
        <Heading level='2' size='medium' spacing>
          Ingen kandidat valgt i modia dekoratøren
        </Heading>
        <TilbakeKnapp />
      </SideLayout>
    );
  }

  if (synlighetHook.isLoading && kandidatnrHook.isLoading) {
    return <Sidelaster />;
  }
/*
  return (
    <SideLayout>
      <div>
        {(!kandidatnrHook.data || !kandidatnrHook.data.arenaKandidatnr) && (
          <HvitKort>
            <Heading level='2' size='large'>
              Fant ikke kandidaten i rekrutteringsbistand
            </Heading>
            <br />
            <TilbakeKnapp />
          </HvitKort>
        )}
        {!synlighetHook.data && (
          <HvitKort>
            <Heading level='2' size='large'>
              Fant ikke kandidaten i rekrutteringsbistand
            </Heading>
            <BodyLong>
              Kandidaten er ikke synlig i Rekrutteringsbistand.
            </BodyLong>
            <br />
            <TilbakeKnapp />
          </HvitKort>
        )}
      </div>
    </SideLayout>
  );
 */
  return (
    <SideLayout>
      <div> {(!kandidatnrHook.data || !kandidatnrHook.data.arenaKandidatnr || !synlighetHook.data) && (
        <HvitKort>
          <div className={'mt-4 max-w-6/12 m-auto flex flex-col flex-wrap gap-4'}>
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
              //onClick={}
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
              //onClick={}
                    style={{width: '283px', height: '48px'}}

            >
              Opprett en melding i Porten
            </Button>
          </div>
        </HvitKort>
      )}
      </div>
    </SideLayout>

  )
};

export default InngangFraArbop;
