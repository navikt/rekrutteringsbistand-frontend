import { format } from 'date-fns';
import { formaterTilISODato } from '../../../../util/dato';
import { StillingsDataDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { InkluderingsTag } from '../omStillingen/StillingSidebar/StillingInkludering';
import { StillingsDataForm } from './redigerFormType.zod';

const capitalize = (str: string) =>
  str
    .split(/[- ]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(str.includes('-') ? '-' : ' ');

const formaterFraISOdato = (dato: string) => {
  return format(dato, 'dd.MM.yyyy');
};

export const mapStillingTilForm = (
  stillingsData: StillingsDataDTO,
): StillingsDataForm => {
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

  return {
    omVirksomheten: {
      beskrivelse:
        stillingsData?.stilling?.properties?.employerdescription?.toString() ??
        '',
      kontaktPersoner: stillingsData?.stilling?.contactList ?? [],
      employerhomepage: stillingsData?.stilling?.properties?.employerhomepage,
      facebookpage: stillingsData?.stilling?.properties?.facebookpage,
      linkedinpage: stillingsData?.stilling?.properties?.linkedinpage,
      twitteraddress: stillingsData?.stilling?.properties?.twitteraddress,
    },
    omTilrettelegging: {
      statligeInkluderingsdugnade: tags?.includes(
        InkluderingsTag.StatligInkluderingsdugnad,
      ),
      tags: tags,
    },
    omStillingen: {
      janzz:
        (
          stillingsData?.stilling?.categoryList?.filter(
            (item) => item.categoryType?.toUpperCase() === 'JANZZ',
          ) as any
        )[0] ?? null,
      beskrivelse: stillingsData?.stilling?.properties?.adtext ?? '',

      adresseLokasjoner:
        stillingsData?.stilling?.locationList?.filter(
          (item) => item.postalCode,
        ) ?? null,

      lokasjoner:
        stillingsData?.stilling?.locationList
          ?.filter((item) => !item.postalCode)
          .map((item) => {
            if (item.municipal) {
              return {
                municipal: capitalize(item.municipal),
                municipalCode: item.municipalCode,
              };
            }
            if (item.county) {
              return { county: capitalize(item.county) };
            }
            if (item.country) {
              return { country: capitalize(item.country) };
            }
            return null;
          })
          .filter((item): item is NonNullable<typeof item> => item !== null) ??
        null,
    },
    praktiskInfo: {
      omfangKode: stillingsData?.stilling?.properties?.extent ?? '',
      omfangProsent: stillingsData?.stilling?.properties?.jobpercentage ?? null,
      sektor: stillingsData?.stilling?.properties?.sector ?? '',
      antallStillinger:
        Number(stillingsData?.stilling?.properties?.positioncount) || 0,
      oppstart: oppstartEtterAvtale
        ? null
        : (stillingsData?.stilling?.properties?.starttime?.toString() ?? null),
      oppstartEtterAvtale,
      søknadsfristSnarest,
      søknadsfrist: søknadsfristSnarest
        ? null
        : (stillingsData?.stilling?.properties?.applicationdue?.toString() ??
          null),
      ansettelsesform:
        stillingsData?.stilling?.properties?.engagementtype ?? null,
      dager: workday,
      tid: workhours,
      arbeidstidsordning:
        stillingsData?.stilling?.properties?.jobarrangement ?? null,
    },
    innspurt: {
      publiseres: stillingsData?.stilling?.published
        ? formaterFraISOdato(stillingsData?.stilling?.published)
        : null,
      avsluttes: stillingsData?.stilling?.expires
        ? formaterFraISOdato(stillingsData?.stilling?.expires)
        : null,
      stillingType: stillingsData?.stilling?.source ?? 'DIR',
      epost: stillingsData?.stilling?.properties?.applicationemail ?? null,
      lenke: stillingsData?.stilling?.properties?.applicationurl ?? null,
    },
  };
};

export const mapFormTilStilling = (
  formData: StillingsDataForm,
  existingData: StillingsDataDTO,
) => {
  return {
    stillingsinfoid: existingData.stillingsinfo?.stillingsinfoid,
    stilling: {
      ...existingData.stilling,
      categoryList: [
        ...(existingData.stilling.categoryList ?? []),
        ...(formData.omStillingen.janzz ? [formData.omStillingen.janzz] : []),
      ],
      contactList: formData.omVirksomheten.kontaktPersoner.map((contact) => ({
        ...contact,
        email: contact.email ?? null,
        phone: contact.phone ?? null,
      })),
      properties: {
        ...existingData.stilling.properties,
        employerdescription: formData.omVirksomheten.beskrivelse,
        employerhomepage: formData.omVirksomheten.employerhomepage,
        facebookpage: formData.omVirksomheten.facebookpage,
        linkedinpage: formData.omVirksomheten.linkedinpage,
        twitteraddress: formData.omVirksomheten.twitteraddress,
        tags: JSON.stringify(formData.omTilrettelegging.tags),
        adtext: formData.omStillingen.beskrivelse,
        sector: formData.praktiskInfo.sektor,
        positioncount: formData.praktiskInfo.antallStillinger,
        starttime: formData.praktiskInfo.oppstartEtterAvtale
          ? 'Etter avtale'
          : formData.praktiskInfo.oppstart,
        applicationdue: formData.praktiskInfo.søknadsfristSnarest
          ? 'Snarest'
          : formData.praktiskInfo.søknadsfrist,
        engagementtype: formData.praktiskInfo.ansettelsesform,
        workday: JSON.stringify(formData.praktiskInfo.dager),
        workhours: JSON.stringify(formData.praktiskInfo.tid),
        extent: formData.praktiskInfo.omfangKode,
        jobpercentage: formData.praktiskInfo.omfangProsent,
        applicationemail: formData.innspurt.epost,
        applicationurl: formData.innspurt.lenke,
        jobarrangement: formData.praktiskInfo.arbeidstidsordning,
      },
      published: formaterTilISODato(formData.innspurt.publiseres),
      expires: formaterTilISODato(formData.innspurt.avsluttes),
      locationList: [
        ...(formData.omStillingen.adresseLokasjoner ?? []),
        ...(formData.omStillingen.lokasjoner ?? []),
      ],
      source: formData.innspurt.stillingType,
    },
  };
};
