import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { format, parse } from 'date-fns';

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
