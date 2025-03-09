'use client';

import { ArbeidsgiverDTO } from '../../../api/pam-search/underenhet/useArbeidsgiver';
import { OpprettNyStillingDTO } from '../../../api/stilling/ny-stilling/dto';
import { opprettNyStilling } from '../../../api/stilling/ny-stilling/opprettNyStilling';
import { useApplikasjonContext } from '../../../providers/ApplikasjonContext';
import { Stillingskategori } from '../../stilling-typer';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export interface OpprettStillingProps {
  stillingskategori: Stillingskategori | null;
  arbeidsgiver: ArbeidsgiverDTO | null;
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
      const erFormidling = stillingskategori === Stillingskategori.Formidling;

      const nyStilling: OpprettNyStillingDTO = {
        kategori: stillingskategori,
        stilling: {
          administration: {
            status: 'PENDING',
            reportee: `${fornavn} ${etternavn}`,
            navIdent: ident ?? '',
          },
          createdBy: 'pam-rekrutteringsbistand',
          updatedBy: 'pam-rekrutteringsbistand',
          source: 'DIR',
          medium: 'DIR',
          businessName: arbeidsgiver.navn,
          privacy: 'INTERNAL_NOT_SHOWN',
          employer: {
            orgnr: arbeidsgiver.organisasjonsnummer ?? '',
            name: arbeidsgiver.navn,
            location: {
              address: arbeidsgiver.adresse?.adresse ?? '',
              postalCode: arbeidsgiver.adresse?.postnummer ?? '',
              county: arbeidsgiver.adresse?.kommune ?? '',
              country: arbeidsgiver.adresse?.land ?? '',
              municipal: arbeidsgiver.adresse?.kommunenummer ?? '',
              city: arbeidsgiver.adresse?.poststed ?? '',
            },
          },
        },
      };

      const response = await opprettNyStilling(nyStilling);

      if (response.stilling.uuid) {
        if (erFormidling) {
          router.push(`/formidling/${response.stilling.uuid}/rediger`);
        } else {
          router.push(`/stilling/${response.stilling.uuid}/rediger`);
        }
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
      Opprett
    </Button>
  );
};
