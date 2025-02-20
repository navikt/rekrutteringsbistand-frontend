import {
  EnvelopeClosedIcon,
  ExternalLinkIcon,
  LocationPinIcon,
  PersonIcon,
  PhoneIcon,
  TasklistIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Heading, Link } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { getMiljø, Miljø } from '../../../../../util/miljø';
import { postApi } from '../../../../api/fetcher';
import { kandidaterSchemaDTO } from '../../../../api/kandidat/schema.zod';

type InfoOmKandidatProps = {
  kandidat: kandidaterSchemaDTO;
};

const arbeidsrettetOppfølgingUrl =
  getMiljø() === Miljø.ProdGcp
    ? 'https://veilarbpersonflate.intern.nav.no'
    : 'https://veilarbpersonflate.intern.dev.nav.no';

const InfoOmKandidat: FunctionComponent<InfoOmKandidatProps> = ({
  kandidat,
}) => {
  const navigerTilAktivitetsplanen = async (
    href: string,
    fødselsnummer: string,
  ) => {
    const response = await postApi(`/api/context`, {
      verdi: fødselsnummer,
      eventType: 'NY_AKTIV_BRUKER',
    });

    console.log('🎺 response', response);
    if (response.ok) {
      window.open(href, '_blank');
    }
  };

  return (
    <Box.New
      background='info-softA'
      borderRadius='xlarge'
      paddingInline='space-16'
      paddingBlock='space-12'
    >
      <div className='mb-8'>
        <Heading size='small' level='2' spacing>
          Om kandidaten
        </Heading>
        <div className='flex flex-col gap-2'>
          <BodyShort
            size='small'
            className='flex items-center whitespace-nowrap'
          >
            <PhoneIcon aria-hidden className='mr-2 shrink-0' />
            {kandidat?.telefon}
          </BodyShort>
          <BodyShort
            size='small'
            className='flex items-center whitespace-nowrap'
          >
            <EnvelopeClosedIcon aria-hidden className='mr-2 shrink-0' />
            {kandidat?.epost ? (
              <Link href={`mailto:${kandidat.epost}`}>{kandidat.epost}</Link>
            ) : (
              'Ingen e-post registrert'
            )}
          </BodyShort>
          <BodyShort
            size='small'
            className='flex items-center whitespace-nowrap'
          >
            <PersonIcon aria-hidden className='mr-2 shrink-0' />
            {kandidat?.fodselsnr && (
              <>
                {`${kandidat.fodselsnr.slice(0, 2)}.${kandidat.fodselsnr.slice(2, 4)}.${
                  parseInt(kandidat.fodselsnr.slice(4, 6)) > 20 ? '19' : '20'
                }${kandidat.fodselsnr.slice(4, 6)}`}
                {' ( '}
                {kandidat.fodselsnr}
                {' )'}
              </>
            )}
          </BodyShort>
          <BodyShort
            size='small'
            className='flex items-center whitespace-nowrap'
          >
            <LocationPinIcon aria-hidden className='mr-2 shrink-0' />-
          </BodyShort>
          <BodyShort
            size='small'
            className='flex items-center whitespace-nowrap'
          >
            <TasklistIcon aria-hidden className='mr-2 shrink-0' />
            {kandidat?.innsatsgruppe || 'Situasjonsbestemt innsats'}
          </BodyShort>
          <Button
            variant='tertiary'
            className='mt-4'
            icon={<ExternalLinkIcon />}
            onClick={() =>
              navigerTilAktivitetsplanen(
                arbeidsrettetOppfølgingUrl,
                kandidat.fodselsnr!,
              )
            }
          >
            Gå til aktivitetsplanen
          </Button>
        </div>
      </div>
    </Box.New>
  );
};

export default InfoOmKandidat;
