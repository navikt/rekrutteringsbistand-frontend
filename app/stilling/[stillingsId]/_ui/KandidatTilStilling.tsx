import { useFinnKandidatForStilling } from './useFinnKandidatForStilling';
import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import KandidatSøkResultat from '@/app/kandidat/KandidatSøkResultat';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import Sidelaster from '@/components/layout/Sidelaster';
import { getMiljø, Miljø } from '@/util/miljø';
import { ArrowRightIcon, FilesIcon } from '@navikt/aksel-icons';
import { Alert, Button, Heading } from '@navikt/ds-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useMemo } from 'react';

export interface KandidatTilStillingProps {
  stillingsData?: StillingsDataDTO;
}

const KandidatTilStilling: FC<KandidatTilStillingProps> = ({
  stillingsData,
}) => {
  const searchParams = useSearchParams();
  const harAndreParametere = searchParams.size > 0;
  const skalHenteStillingsData = stillingsData && !harAndreParametere;
  const kandidatForStillingData = useFinnKandidatForStilling(
    skalHenteStillingsData ? stillingsData : null,
  );
  const router = useRouter();
  const { erEier, kandidatlisteInfo, kandidatlisteLaster } =
    useStillingsContext();

  const kandidatlisteHook = useKandidatlisteForEier(stillingsData, erEier);
  const alleredeLagtTilKandidatliste = useMemo(() => {
    const kandidater = kandidatlisteHook?.data?.kandidater;
    if (!kandidater) return [] as string[];
    return kandidater
      .map((kandidat) => kandidat.kandidatnr)
      .filter((id): id is string => id !== null);
  }, [kandidatlisteHook?.data?.kandidater]);

  const kopierArbeidsplassenLenke = () => {
    const miljø = getMiljø();
    if (miljø === Miljø.ProdGcp) {
      navigator.clipboard.writeText(
        `https://arbeidsplassen.nav.no/stillinger/stilling/${stillingsData?.stilling?.uuid}`,
      );
    }
    navigator.clipboard.writeText(
      `https://arbeidsplassen.intern.dev.nav.no/stillinger/stilling/${stillingsData?.stilling?.uuid}`,
    );
  };

  if (
    (skalHenteStillingsData && kandidatForStillingData.isLoading) ||
    kandidatlisteLaster
  ) {
    return <Sidelaster />;
  }

  return (
    <>
      {!kandidatlisteInfo?.kandidatlisteId ? (
        <Alert variant='error'>
          <Heading spacing size='small' level='3'>
            Du kan ikke foreslå kandidater til stillingen
          </Heading>
          <p className='mb-4'>
            Stillingsoppdraget ligger på arbeidsplassen.no og brukes ikke av Nav
            til aktivt rekrutteringssamarbeid med arbeidsgiveren.
          </p>
          <p className='mb-4'>
            Du kan alltids dele lenken til stillingsoppdraget med jobbsøkeren,
            og be de søke selv.
          </p>
          <Button
            variant='secondary-neutral'
            icon={<FilesIcon />}
            onClick={kopierArbeidsplassenLenke}
          >
            Kopier delingslenke
          </Button>
          <p className='mb-4 mt-8'>
            Ønsker du å legge til jobbsøkere må Nav ha inngått avtale med
            arbeidsgiver om å hjelpe dem med rekruttering, og stillingsoppdraget
            må oppdateres. For å gjøre dette må du:
          </p>
          <ol className='list-decimal list-inside mb-4 space-y-2'>
            <li>
              Ha tilgangen Arbeidsgiverrettet i Modia rekrutteringsbistand.
            </li>
            <li>
              Sørge for at det er avtalt med arbeidsgiveren å bruke
              stillingsoppdraget til rekruttering ved hjelp fra Nav.
            </li>
            <li>
              Velge at stillingsoppdrag skal brukes til rekrutteringsoppdrag ved
              å trykke på knappen &quot;Bruk til rekrutteringsoppdrag&quot; på
              stillingsoppdrag siden.
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
              router.push(`/stilling/${stillingsData?.stilling?.uuid}`)
            }
          >
            Gå til stillingsoppdraget
          </Button>
        </Alert>
      ) : (
        <>
          {kandidatlisteInfo?.kandidatlisteStatus ===
            Kandidatlistestatus.Lukket && (
            <Alert variant='error' className='mb-4'>
              Kandidatliste er lukket, så du kan ikke legge til jobbsøkere.
            </Alert>
          )}
          <KandidatSøkResultat
            stillingsId={stillingsData?.stilling?.uuid}
            alleredeLagtTilKandidatliste={alleredeLagtTilKandidatliste}
          />
        </>
      )}
    </>
  );
};
export default KandidatTilStilling;
