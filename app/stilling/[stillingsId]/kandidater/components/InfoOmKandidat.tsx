import { BodyShort, Label, Link } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { getMiljø, Miljø } from '../../../../../util/miljø';
import { postApi } from '../../../../api/fetcher';
import { KandidatForespurtOmDelingSchema } from '../../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
import { kandidaterSchemaDTO } from '../../../../api/kandidat/schema.zod';
import { Sms } from '../../../../api/kandidatvarsel/kandidatvarsel';
import { Kandidatstatus } from '../KandidatIKandidatlisteTyper';
import KandidatHendelser from './KandidatHendelse';
import VelgStatus from './VelgStatus';

type InfoOmKandidatProps = {
  innaktiv: boolean;
  kandidatlisteId: string;
  kandidat: kandidaterSchemaDTO;
  forespørselCvForKandidat: KandidatForespurtOmDelingSchema[] | null;
  beskjedForKandidat?: Sms;
};

const arbeidsrettetOppfølgingUrl =
  getMiljø() === Miljø.ProdGcp
    ? 'https://veilarbpersonflate.intern.nav.no'
    : 'https://veilarbpersonflate.intern.dev.nav.no';

const InfoOmKandidat: FunctionComponent<InfoOmKandidatProps> = ({
  innaktiv,
  kandidat,
  kandidatlisteId,
  forespørselCvForKandidat,
  beskjedForKandidat,
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
    <div>
      {!innaktiv && (
        <div className='grid grid-cols-2 gap-8 mb-8'>
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
      )}

      <div className='grid grid-cols-2 gap-8 mb-8'>
        <VelgStatus
          kandidatlisteId={kandidatlisteId}
          kandidatnr={kandidat.kandidatnr}
          status={kandidat.status as Kandidatstatus}
        />
        <KandidatHendelser
          kandidat={kandidat}
          forespørselCvForKandidat={forespørselCvForKandidat}
          beskjedForKandidat={beskjedForKandidat}
        />
      </div>
    </div>
  );
};

export default InfoOmKandidat;
