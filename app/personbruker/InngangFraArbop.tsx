'use client';

import { useArenaKandidatnr } from '@/app/api/kandidat-sok/useArenaKandidatnr';
import { useSynlighetsevaluering } from '@/app/api/synlighet/evaluering/useSynlighetsevaluering';
import Sidelaster from '@/components/layout/Sidelaster';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import Forvirretblob from '@/public/illustrasjoner/feilmelding-blob.svg';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { Button, Heading } from '@navikt/ds-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';

const navetUrl =
  'https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Hvorfor-er-ikke-personen-synlig-i-Rekr.aspx';
const portenUrl =
  'https://jira.adeo.no/plugins/servlet/desk/portal/541/create/1904';

const InngangFraArbop: FC = () => {
  const { valgtFnr, harRolle } = useApplikasjonContext();
  const kandidatnrHook = useArenaKandidatnr(valgtFnr);
  const synlighetHook = useSynlighetsevaluering(valgtFnr);

  const router = useRouter();

  useEffect(() => {
    if (
      harRolle([
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]) &&
      kandidatnrHook.data &&
      kandidatnrHook.data.arenaKandidatnr &&
      synlighetHook.data
    ) {
      router.push(
        `/kandidat/${kandidatnrHook.data.arenaKandidatnr}/finn-stilling`,
      );
    }
  }, [kandidatnrHook.data, synlighetHook.data, router, harRolle]);

  if (synlighetHook.isLoading || kandidatnrHook.isLoading) {
    return <Sidelaster />;
  }

  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      {(!kandidatnrHook.data ||
        !kandidatnrHook.data.arenaKandidatnr ||
        !synlighetHook.data ||
        !valgtFnr) && (
        <div className={'m-auto mt-4 flex max-w-2xl flex-col flex-wrap gap-4'}>
          <div className={'mt-10 flex flex-1 flex-row items-center gap-8'}>
            <Heading level='2' size='large' className={'w-96 flex-1'}>
              Personen vises ikke i rekrutteringsbistand
            </Heading>
            <Image
              src={Forvirretblob}
              alt={'En figur som ser forvirret ut'}
            ></Image>
          </div>
          <p>
            Ikke alle personer kan vises i rekrutteringsbistand. For at de skal
            dukke opp er det noen regler som må oppfylles først. De finner du
            her:
          </p>
          <Button
            data-color='neutral'
            variant={'secondary'}
            size={'small'}
            icon={<ArrowRightIcon aria-hidden />}
            iconPosition={'right'}
            onClick={() => window.open(navetUrl, '_blank')}
            style={{ width: '224px', height: '48px' }}
          >
            Vis reglene på navet
          </Button>
          <p>
            Siden vi ikke kan behandle opplysninger om den du prøver å finne,
            kan vi dessverre ikke hjelpe deg med å vise{' '}
            <span className={'italic'}>akkurat</span> hva som mangler 😥. Det
            pleier ofte å være at de bare mangler jobbprofilen i CVen, så sjekk
            gjerne det først.
          </p>
          <p className={'mt-4 text-xl font-semibold'}>
            Jeg har sjekket alt som ble nevnt på Navet, men personen vises
            fortsatt ikke. Hva gjør jeg nå?
          </p>
          <p>
            Hvis punktene er oppfylt, men personen fortsatt ikke dukker opp, kan
            du opprette en melding i Porten. Der rapporterer du feilen sånn at
            vi kan følge den opp.
          </p>
          <Button
            data-color='neutral'
            variant={'secondary'}
            size={'small'}
            icon={<ArrowRightIcon aria-hidden />}
            iconPosition={'right'}
            onClick={() => window.open(portenUrl, '_blank')}
            style={{ width: '283px', height: '48px' }}
          >
            Opprett en melding i Porten
          </Button>
        </div>
      )}
    </TilgangskontrollForInnhold>
  );
};

export default InngangFraArbop;
