import { BodyShort, Button, Label, Link } from '@navikt/ds-react';
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

    if (response.ok) {
      window.open(href, '_blank');
    }
  };

  return (
    <div className='flex flex-row justify-between mb-4 '>
      <div>
        <Label spacing as='p'>
          Kontaktinfo:
        </Label>
        <BodyShort>
          E-post:{' '}
          {kandidat.epost ? (
            <Link href={`mailto:${kandidat.epost}`}>{kandidat.epost}</Link>
          ) : (
            <span>&mdash;</span>
          )}
        </BodyShort>
        <BodyShort>
          Telefon: {kandidat.telefon ? kandidat.telefon : <span>&mdash;</span>}
        </BodyShort>
      </div>
      <div className='flex flex-col gap-2'>
        <Label spacing as='p'>
          Innsatsgruppe:
        </Label>
        <div>
          <span>{kandidat.innsatsgruppe} </span>
          <Button
            variant='tertiary'
            onClick={() =>
              navigerTilAktivitetsplanen(
                arbeidsrettetOppfølgingUrl,
                kandidat.fodselsnr,
              )
            }
          >
            Åpne aktivitetsplan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoOmKandidat;
