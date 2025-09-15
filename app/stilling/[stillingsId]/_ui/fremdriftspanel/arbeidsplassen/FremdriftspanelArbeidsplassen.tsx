import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { setKandidatlisteStatus } from '@/app/api/kandidat/setKandidatlisteStatus';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import HarKandidatlisteVisning from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/arbeidsplassen/HarKandidatlisteVisning';
import OpprettRekrutteringsoppdrag from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/arbeidsplassen/OpprettStillingsoppdrag';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { formaterNorskDato } from '@/util/util';
import {
  ArrowForwardIcon,
  BriefcaseIcon,
  CircleSlashIcon,
  DocPencilIcon,
  HandshakeIcon,
  PlusCircleIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Box, Heading } from '@navikt/ds-react';
import { useState } from 'react';

export default function FremdriftspanelArbeidsplassen() {
  const { stillingsData, refetch, erEier } = useStillingsContext();
  const { visVarsel } = useApplikasjonContext();
  const [loading, setLoading] = useState(false);
  const kandidatlisteForEier = useKandidatlisteForEier(stillingsData, erEier);

  const endreKandidatlisteStatus = async (
    kandidatlisteId: string,
    status: Kandidatlistestatus,
  ) => {
    setLoading(true);
    try {
      await setKandidatlisteStatus(kandidatlisteId, status);
      visVarsel({ type: 'success', tekst: 'Du har nå fullført oppdraget.' });

      kandidatlisteForEier.mutate();
      if (refetch) refetch();
    } catch (error) {
      visVarsel({
        type: 'error',
        tekst: 'Klarte ikke å endre status på oppdraget',
      });
      new RekbisError({ message: 'Klarte ikke å fullføre oppdrag', error });
    }
    setLoading(false);
  };

  const kanBrukesTilRekrutteringsoppdrag =
    stillingsData.stilling.employer?.orgnr;

  const harKandidatliste = stillingsData.stillingsinfo !== null;

  const renderKanBrukerTilStillingsoppdrag = (
    <>
      <OpprettRekrutteringsoppdrag />
      <Box.New background='neutral-soft' borderRadius={'large'} padding='3'>
        <Heading size='xsmall' level='3' className='mb-4'>
          Bruk til rekrutteringsoppdrag
        </Heading>
        <div className='flex gap-4 flex-col'>
          <div className='flex gap-2'>
            <HandshakeIcon aria-hidden className='shrink-0' />
            <BodyShort size='small'>
              Du kan bruke annonsen til rekrutteringsoppdrag hvis du har avtalt
              det med arbeidsgiveren.
            </BodyShort>
          </div>
          <div className='flex gap-2'>
            <DocPencilIcon aria-hidden className='shrink-0' />
            <BodyShort size='small'>
              Ved å bruke til oppdrag vil den fungere som interne annonser.
            </BodyShort>
          </div>
        </div>
      </Box.New>
    </>
  );

  const renderKanIKKEBrukesTilStillingsoppdrag = (
    <Box.New
      background='brand-beige-moderate'
      borderRadius={'large'}
      padding='3'
    >
      <Heading size='xsmall' level='3' className='mb-4'>
        Annonsen mangler et gyldig organisasjonsnummer.
      </Heading>
      <div className='flex gap-4 flex-col'>
        <div className='flex gap-2'>
          <CircleSlashIcon aria-hidden className='shrink-0' />
          <BodyShort size='small'>
            Det gjør at den kan ikke brukes til rekrutteringsoppdrag.
          </BodyShort>
        </div>
        <div className='flex gap-2'>
          <PlusCircleIcon aria-hidden className='shrink-0' />
          <BodyShort size='small'>
            Har du et oppdrag med arbeidsgiveren kan du opprette et
            stillingsoppdrag selv her i Rekrutteringsbistand.
          </BodyShort>
        </div>
      </div>
    </Box.New>
  );

  return (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ]}
    >
      <Heading size='small' level='2'>
        Hentet fra arbeidsplassen.no
      </Heading>
      <BodyShort size='small' textColor='subtle'>
        den {formaterNorskDato({ dato: stillingsData.stilling.published })}
      </BodyShort>
      <div className='flex flex-col gap-6 mt-6'>
        {harKandidatliste ? (
          <HarKandidatlisteVisning />
        ) : kanBrukesTilRekrutteringsoppdrag ? (
          renderKanBrukerTilStillingsoppdrag
        ) : (
          renderKanIKKEBrukesTilStillingsoppdrag
        )}
        <Box.New background='neutral-soft' borderRadius={'large'} padding='3'>
          <Heading size='xsmall' level='3' className='mb-4'>
            Bruk til deling
          </Heading>
          <div className='flex gap-4 flex-col'>
            <div className='flex gap-2'>
              <ArrowForwardIcon aria-hidden className='shrink-0' />
              <BodyShort size='small'>
                Du kan dele stillingen med folk i aktivitetsplanen via systemet,
                eller ved å kopiere delingslenken.
              </BodyShort>
            </div>
            <div className='flex gap-2'>
              <BriefcaseIcon aria-hidden className='shrink-0' />
              <BodyShort size='small'>
                Personen søker selv, eller med litt hjelp.
              </BodyShort>
            </div>
          </div>
        </Box.New>
      </div>
    </TilgangskontrollForInnhold>
  );
}
