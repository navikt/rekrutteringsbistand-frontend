'use client';

import { UmamiEvent } from '../../../../util/umamiEvents';
import { ArbeidsgiverDTO } from '../../../api/pam-search/underenhet/useArbeidsgiver';
import { OpprettNyStillingDTO } from '../../../api/stilling/ny-stilling/dto';
import { opprettNyStilling } from '../../../api/stilling/ny-stilling/opprettNyStilling';
import { useApplikasjonContext } from '../../../providers/ApplikasjonContext';
import { useUmami } from '../../../providers/UmamiContext';
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
    valgtNavKontor,
  } = useApplikasjonContext();
  const { track } = useUmami();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleOpprettStilling = async () => {
    setIsLoading(true);
    if (valgtNavKontor?.navKontor && stillingskategori && arbeidsgiver) {
      const erFormidling = stillingskategori === Stillingskategori.Formidling;

      const nyStilling: OpprettNyStillingDTO = {
        eierNavKontorEnhetId: valgtNavKontor?.navKontor,
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
            parentOrgnr: arbeidsgiver.overordnetEnhet ?? '',
            orgform: arbeidsgiver.organisasjonsform ?? '',
            employees: arbeidsgiver.antallAnsatte ?? null,
            location: {
              municipalCode: arbeidsgiver.adresse?.kommunenummer ?? '',
              address: arbeidsgiver.adresse?.adresse ?? '',
              postalCode: arbeidsgiver.adresse?.postnummer ?? '',
              county: '',
              country: arbeidsgiver.adresse?.land ?? '',
              municipal: arbeidsgiver.adresse?.kommune ?? '',
              city: arbeidsgiver.adresse?.poststed ?? '',
            },
            properties: {
              nace2:
                (arbeidsgiver.naringskoder &&
                  JSON.stringify(
                    arbeidsgiver.naringskoder.map((naringskode) => {
                      return {
                        code: naringskode.kode,
                        name: naringskode.beskrivelse,
                      };
                    }),
                  )) ??
                null,
            },
          },
        },
      };

      const response = await opprettNyStilling(nyStilling);

      if (response.stilling.uuid) {
        track(UmamiEvent.Stilling.opprettet_stilling);
        if (erFormidling) {
          router.push(`/etterregistrering/${response.stilling.uuid}/rediger`);
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
