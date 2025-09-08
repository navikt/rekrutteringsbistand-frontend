import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { format, parse } from 'date-fns';

const formaterFraISOdato = (dato: string) => {
  if (dato.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
    return dato; // Already formatted correctly
  }

  return format(new Date(dato), 'dd.MM.yyyy');
};

export const mapTilForm = (
  stillingsData: StillingsDataDTO,
): StillingsDataDTO => {
  const tags = stillingsData?.stilling?.properties?.tags
    ? JSON.parse(stillingsData.stilling.properties.tags)
    : [];

  const workhours = stillingsData?.stilling?.properties?.workhours
    ? JSON.parse(stillingsData.stilling.properties.workhours)
    : [];

  const workday = stillingsData?.stilling?.properties?.workday
    ? JSON.parse(stillingsData.stilling.properties.workday)
    : [];

  const oppstartEtterAvtale =
    stillingsData?.stilling?.properties?.starttime === 'Etter avtale';

  const søknadsfristSnarest =
    stillingsData?.stilling?.properties?.applicationdue === 'Snarest';

  const søknadsfristDato = søknadsfristSnarest
    ? søknadsfristSnarest
    : typeof stillingsData?.stilling?.properties?.applicationdue === 'string' &&
      formaterFraISOdato(stillingsData?.stilling?.properties?.applicationdue);

  const oppstartDato = oppstartEtterAvtale
    ? oppstartEtterAvtale
    : typeof stillingsData?.stilling?.properties?.starttime === 'string' &&
      formaterFraISOdato(stillingsData?.stilling?.properties?.starttime);

  return {
    ...stillingsData,
    stilling: {
      ...stillingsData.stilling,
      properties: {
        ...stillingsData.stilling.properties,
        tags: JSON.stringify(tags),
        workhours,
        workday,
        applicationdue: søknadsfristDato ?? null,
        starttime: oppstartDato ?? null,
      },
    },
  };
};

export const mapSendStillingOppdatering = (
  stillingsData: StillingsDataDTO,
): StillingsDataDTO => {
  const publiseringsDato = stillingsData.stilling?.published
    ? format(
        parse(stillingsData.stilling?.published, 'dd.MM.yyyy', new Date()),
        "yyyy-MM-dd'T'HH:mm:ss",
      )
    : null;

  const avsluttesDato = stillingsData.stilling?.expires
    ? format(
        parse(stillingsData.stilling?.expires, 'dd.MM.yyyy', new Date()),
        "yyyy-MM-dd'T'HH:mm:ss",
      )
    : null;

  return {
    ...stillingsData,
    stilling: {
      ...stillingsData.stilling,
      properties: {
        ...stillingsData.stilling.properties,
        tags: JSON.stringify(stillingsData.stilling?.properties?.tags),
        workday: JSON.stringify(stillingsData.stilling?.properties?.workday),
        workhours: JSON.stringify(
          stillingsData.stilling?.properties?.workhours,
        ),
      },
      published: publiseringsDato,
      expires: avsluttesDato,
    },
  };
};
