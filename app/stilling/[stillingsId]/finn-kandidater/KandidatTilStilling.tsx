import { getMiljø, Miljø } from '../../../../util/miljø';
import { Kandidatlistestatus } from '../../../api/kandidat/schema.zod';
import { useKandidatlisteInfo } from '../../../api/kandidat/useKandidatlisteInfo';
import { StillingsDataDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import Sidelaster from '../../../components/Sidelaster';
import KandidatSøkTabs from '../../../kandidat/KandidatSøkTabs';
import { useFinnKandidatForStilling } from './useFinnKandidatForStilling';
import { ArrowRightIcon, FilesIcon } from '@navikt/aksel-icons';
import { Alert, Button, Heading } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export interface KandidatTilStillingProps {
  stillingsData?: StillingsDataDTO;
}

const KandidatTilStilling: React.FC<KandidatTilStillingProps> = ({
  stillingsData,
}) => {
  useFinnKandidatForStilling(stillingsData);
  const router = useRouter();

  const kandidatListeInformasjonHook = useKandidatlisteInfo(
    stillingsData?.stillingsinfo,
  );

  const kopierArbeidsplassenLenke = () => {
    const miljø = getMiljø();
    if (miljø === Miljø.ProdGcp) {
      navigator.clipboard.writeText(
        `https://arbeidsplassen.nav.no/stillinger/stilling/${stillingsData?.stilling.uuid}`,
      );
    }
    navigator.clipboard.writeText(
      `https://arbeidsplassen.intern.dev.nav.no/stillinger/stilling/${stillingsData?.stilling.uuid}`,
    );
  };

  if (kandidatListeInformasjonHook?.isLoading) {
    return <Sidelaster />;
  }

  return (
    <>
      {!kandidatListeInformasjonHook?.data?.kandidatlisteId ? (
        <Alert variant='error'>
          <Heading spacing size='small' level='3'>
            Du kan ikke foreslå kandidater til stillingen
          </Heading>

          <p className='mb-4'>
            Annonsen ligger på arbeidsplassen.no og brukes ikke av Nav til
            aktivt rekrutteringssamarbeid med arbeidsgiveren.
          </p>

          <p className='mb-4'>
            Du kan alltids dele lenken til annonsen med jobbsøkeren, og be de
            søke selv.
          </p>

          <Button
            variant='secondary-neutral'
            icon={<FilesIcon />}
            onClick={kopierArbeidsplassenLenke}
          >
            Kopier delingslenke
          </Button>

          <p className='mb-4 mt-8'>
            Ønsker du å legge til kandidater må Nav ha inngått avtale med
            arbeidsgiver om å hjelpe dem med rekruttering, og annonsen må
            oppdateres. For å gjøre dette må du:
          </p>

          <ol className='list-decimal list-inside mb-4 space-y-2'>
            <li>
              Ha tilgangen Arbeidsgiverrettet i Modia rekrutteringsbistand.
            </li>
            <li>
              Sørge for at det er avtalt med arbeidsgiveren å bruke annonsen til
              rekruttering ved hjelp fra Nav.
            </li>
            <li>
              Velge at stillingsannonsen skal brukes til rekrutteringsoppdrag
              ved å trykke på knappen &quot;Bruk til rekrutteringsoppdrag&quot;
              på annonsesiden.
            </li>
          </ol>

          <p className='mb-6'>
            Har du ikke tilgangen selv kan du høre med en markedskontakt ved
            kontoret ditt om å undersøke videre.
          </p>

          <Button
            icon={<ArrowRightIcon />}
            iconPosition='right'
            variant='secondary-neutral'
            onClick={() =>
              router.push(`/stilling/${stillingsData?.stilling.uuid}`)
            }
          >
            Gå til stillingannonsen
          </Button>
        </Alert>
      ) : (
        <>
          {kandidatListeInformasjonHook?.data?.kandidatlisteStatus ===
            Kandidatlistestatus.Lukket && (
            <Alert variant='error' className='mb-4'>
              Kandidatliste er lukket, så du kan ikke legge til kandidater.
            </Alert>
          )}
          <KandidatSøkTabs stillingsId={stillingsData?.stilling.uuid} />
        </>
      )}
    </>
  );
};

export default KandidatTilStilling;
