import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import SlettOppdragModal from '@/app/stilling/[stillingsId]/_ui/tabs/SlettOppdragModal';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import UtkastFigur from '@/public/illustrasjoner/figur-med-verktøy.svg';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button, Heading } from '@navikt/ds-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function StillingsutkastMelding() {
  const { stillingsData, erEier } = useStillingsContext();
  const router = useRouter();
  const [visSlettModal, setVisSlettModal] = useState(false);

  if (!erEier) {
    return null;
  }
  return (
    <div className={'flex flex-col items-center gap-4 self-stretch px-5 py-10'}>
      <Image
        src={UtkastFigur}
        alt={'En smilende figur med verktøy i hendene'}
      ></Image>
      <Heading level='5' size='small'>
        Oppdraget er ikke publisert enda
      </Heading>
      <p className={'pb-10'}>
        Fortsett der du slapp, eller slett det hvis du vil
      </p>
      <div className={'flex gap-2 pb-5'}>
        <Button
          variant={'primary'}
          className={'h-12 w-72'}
          onClick={() => {
            stillingsData.stillingsinfo?.stillingskategori ===
            Stillingskategori.Formidling
              ? router.push(`/stilling/${stillingsData.stilling.uuid}/rediger`)
              : router.push(
                  `/etterregistrering/${stillingsData.stilling.uuid}/rediger`,
                );
          }}
        >
          Fortsett å opprette
        </Button>
        <Button
          icon={<TrashIcon />}
          variant='tertiary'
          onClick={() => setVisSlettModal(true)}
        >
          Slett
        </Button>
        {visSlettModal && <SlettOppdragModal setVisModal={setVisSlettModal} />}
      </div>
    </div>
  );
}
