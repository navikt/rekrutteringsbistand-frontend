import {
  BodyShort,
  Button,
  Heading,
  Label,
  Link,
  Radio,
  RadioGroup,
} from '@navikt/ds-react';
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
  if (!kandidat.fodselsnr) {
    return null;
  }

  const navigerTilAktivitetsplanen = async (
    href: string,
    fødselsnummer: string,
  ) => {
    const response = await postApi(`/api/context`, {
      verdi: fødselsnummer,
      eventType: 'NY_AKTIV_BRUKER',
    });

    if (response.ok) {
      window.open(href, '_blank');
    }
  };

  return (
    <div>
      <div className='grid grid-cols-3 gap-4 mb-4'>
        <div>
          <Label spacing as='p'>
            Kontaktinfo:
          </Label>
          <BodyShort>
            E-post:{' '}
            {kandidat?.epost ? (
              <Link href={`mailto:${kandidat.epost}`}>{kandidat.epost}</Link>
            ) : (
              <span>-</span>
            )}
          </BodyShort>
          <BodyShort>
            Telefon: {kandidat?.telefon ? kandidat.telefon : <span>-</span>}
          </BodyShort>
        </div>
        <div>
          <Label spacing as='p'>
            Innsatsgruppe:
          </Label>
          <div>
            <span>{kandidat?.innsatsgruppe} </span>
          </div>
          <Link
            onClick={() =>
              navigerTilAktivitetsplanen(
                arbeidsrettetOppfølgingUrl,
                kandidat.fodselsnr!,
              )
            }
          >
            Åpne aktivitetsplan
          </Link>
        </div>
      </div>
      <hr className='border-gray-200 my-4' />

      <div className='grid grid-cols-2 gap-8'>
        <div>
          <Heading size='small' spacing>
            Velg status
          </Heading>
          <RadioGroup
            legend=''
            // value={selectedStatus}
            // onChange={setSelectedStatus}
          >
            <Radio value='vurderes'>
              Vurderes
              <BodyShort size='small' className='text-gray-600'>
                Settes automatisk når en kandidat legges i listen
              </BodyShort>
            </Radio>
            <Radio value='kontaktet'>Kontaktet</Radio>
            <Radio value='aktuell'>Aktuell</Radio>
            <Radio value='til_intervju'>Til intervju</Radio>
            <Radio value='ikke_aktuell'>Ikke aktuell</Radio>
            <Radio value='ikke_interessert'>Ikke interessert</Radio>
          </RadioGroup>
          <Button variant='primary' size='small' className='mt-4'>
            Lagre status
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoOmKandidat;
