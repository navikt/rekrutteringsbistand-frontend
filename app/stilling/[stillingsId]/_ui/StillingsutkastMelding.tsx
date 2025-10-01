import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import EndreStillingStatus from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/EndreStillingStatus';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import UtkastFigur from '@/public/illustrasjoner/figur-med-verktøy.svg';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button, Heading } from '@navikt/ds-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function StillingsutkastMelding() {
  const { stillingsData, erEier, kandidatlisteInfo } = useStillingsContext();
  const router = useRouter();

  if (!erEier) {
    return null;
  }
  return (
    <div className={'flex flex-col items-center gap-4 self-stretch py-10 px-5'}>
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
          className={'w-72 h-12'}
          disabled={kandidatlisteInfo?.kandidatlisteStatus === 'LUKKET'}
          onClick={() =>
            router.push(`/stilling/${stillingsData.stilling.uuid}/rediger`)
          }
        >
          Fortsett å opprette
        </Button>
        <EndreStillingStatus
          nyStatus={StillingsStatus.Slettet}
          knappNavn='Slett'
          knappIkon={<TrashIcon />}
          tekst={''}
        />
      </div>
    </div>
  );
}
