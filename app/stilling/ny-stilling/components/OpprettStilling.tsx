'use client';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { FinnArbeidsgiverDTO } from '../../../api/stilling/finn-arbeidsgiver/useFinnArbeidsgiver';
import { NyStillingDTO } from '../../../api/stilling/ny-stilling/dto';
import { opprettNyStilling } from '../../../api/stilling/ny-stilling/opprettNyStilling';
import { useApplikasjonContext } from '../../../ApplikasjonContext';
import { Stillingskategori } from '../../stilling-typer';
export interface OpprettStillingProps {
  stillingskategori: Stillingskategori | null;
  arbeidsgiver: FinnArbeidsgiverDTO | null;
}

export const OpprettStillingKnapp: React.FC<OpprettStillingProps> = ({
  stillingskategori,
  arbeidsgiver,
}) => {
  const {
    brukerData: { fornavn, etternavn, ident },
  } = useApplikasjonContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleOpprettStilling = async () => {
    setIsLoading(true);
    if (stillingskategori && arbeidsgiver) {
      const stilling: NyStillingDTO = {
        kategori: stillingskategori,
        stilling: {
          createdBy: 'pam-rekrutteringsbistand',
          updatedBy: 'pam-rekrutteringsbistand',
          source: 'DIR',
          privacy: 'INTERNAL_NOT_SHOWN',
          administration: {
            status: 'PENDING',
            reportee: `${fornavn} ${etternavn}`,
            navIdent: ident ?? '',
          },
          employer: {
            orgnr: arbeidsgiver.orgnr ?? '',
            name: arbeidsgiver.name,
            location: {
              address: arbeidsgiver.location?.address ?? '',
              postalCode: arbeidsgiver.location?.postalCode ?? '',
              county: arbeidsgiver.location?.county ?? '',
              country: arbeidsgiver.location?.country ?? '',
              municipal: arbeidsgiver.location?.municipal ?? '',
              latitude: arbeidsgiver.location?.latitude ?? '',
              longitude: arbeidsgiver.location?.longitude ?? '',
              city: arbeidsgiver.location?.city ?? '',
            },
          },
        },
      };

      const response = await opprettNyStilling(stilling);

      if (response.stilling.uuid) {
        router.push(`/stilling/${response.stilling.uuid}/rediger`);
      } else {
        alert('Feil ved opprettelse av stilling');
      }
    }
    setIsLoading(false);
  };

  return (
    <Button
      loading={isLoading}
      onClick={handleOpprettStilling}
      icon={<PlusCircleIcon aria-hidden />}
      variant='primary'
      disabled={!arbeidsgiver || !stillingskategori}
    >
      Opprett stilling
    </Button>
  );
};
