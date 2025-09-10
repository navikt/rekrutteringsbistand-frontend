import { opprettStillingsinfo } from '@/app/api/stilling/opprett-stillingsinfo/opprett-stillingsinfo';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { formaterNorskDato } from '@/util/util';
import {
  ArrowForwardIcon,
  BriefcaseIcon,
  DocPencilIcon,
  HandshakeIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Heading } from '@navikt/ds-react';
import { useState } from 'react';

export default function FremdriftspanelArbeidsplassen() {
  const { stillingsData } = useStillingsContext();
  const { brukerData } = useApplikasjonContext();
  const kanBrukesTilRekrutteringsoppdrag =
    stillingsData.stilling.employer?.orgnr;

  const [loading, setLoading] = useState(false);

  const opprett = async () => {
    setLoading(true);
    await opprettStillingsinfo({
      stillingsid: stillingsData.stilling.uuid,
      eierNavident: brukerData.ident,
      eierNavn: brukerData.navn,
    });
    setLoading(false);
  };

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
        {kanBrukesTilRekrutteringsoppdrag && (
          <>
            <Button size='small' loading={loading} onClick={opprett}>
              Bruk til oppdrag
            </Button>
            <Box.New
              background='neutral-soft'
              borderRadius={'large'}
              padding='3'
            >
              <Heading size='xsmall' level='3' className='mb-4'>
                Bruk til rekrutteringsoppdrag
              </Heading>
              <div className='flex gap-4 flex-col'>
                <div className='flex gap-2'>
                  <HandshakeIcon aria-hidden className='shrink-0' />
                  <BodyShort size='small'>
                    Du kan bruke annonsen til rekrutteringsoppdrag hvis du har
                    avtalt det med arbeidsgiveren.
                  </BodyShort>
                </div>
                <div className='flex gap-2'>
                  <DocPencilIcon aria-hidden className='shrink-0' />
                  <BodyShort size='small'>
                    Ved å bruke til oppdrag vil den fungere som interne
                    annonser.
                  </BodyShort>
                </div>
              </div>
            </Box.New>
          </>
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
