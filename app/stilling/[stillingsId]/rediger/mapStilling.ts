import { JanzzTittelDTO } from '../../../api/pam-ontologi/stillingsTittel/useStillingsTittel';
import {
  CategorySchemaDTO,
  StillingsDataDTO,
} from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { InkluderingsTag } from '../omStillingen/StillingSidebar/StillingInkludering';
import { StillingsDataForm } from './redigerFormType.zod';
import { format, parse } from 'date-fns';

export enum StillingSynlighet {
  INTERN = 'INTERNAL_NOT_SHOWN',
  EKSTERN = 'SHOW_ALL',
}

export const mapJanzzTilKategori = (
  janzz: JanzzTittelDTO,
): CategorySchemaDTO[] => {
  return [
    {
      id: null,
      code: janzz?.konseptId.toString() ?? null,
      categoryType: 'JANZZ',
      name: janzz?.label ?? null,
      description: null,
      parentId: null,
    },
    {
      id: null,
      code: janzz?.esco ?? null,
      categoryType: 'ESCO',
      name: janzz?.escoLabel ?? null,
      description: null,
      parentId: null,
    },
    {
      id: null,
      code: janzz?.styrk08 ?? null,
      categoryType: 'STYRK08',
      name: janzz?.styrk08Label ?? null,
      description: null,
      parentId: null,
    },
  ];
};

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

  const søknadsfristDato =
    !søknadsfristSnarest &&
    typeof stillingsData?.stilling?.properties?.applicationdue === 'string' &&
    formaterFraISOdato(stillingsData?.stilling?.properties?.applicationdue);

  const oppstartDato =
    !oppstartEtterAvtale &&
    typeof stillingsData?.stilling?.properties?.starttime === 'string' &&
    formaterFraISOdato(stillingsData?.stilling?.properties?.starttime);

  const harIkkeLokasjon = stillingsData?.stilling?.locationList?.length === 0;

  const employerLokasjon = [
    {
      ...stillingsData?.stilling?.employer?.location,
    },
  ];

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
      categoryList: stillingsData?.stilling?.categoryList ?? [],
      beskrivelse: stillingsData?.stilling?.properties?.adtext ?? '',
      adresser: harIkkeLokasjon
        ? employerLokasjon
        : (stillingsData?.stilling?.locationList
            ?.filter((a) => a.address !== null)
            .map((a) => {
              return { ...a, adresseType: true };
            }) ?? []),
      lokasjoner:
        stillingsData?.stilling?.locationList
          ?.filter((a) => a.address === null)
          .map((a) => {
            return { ...a, adresseType: false };
          }) ?? [],
    },
    praktiskInfo: {
      omfangKode: stillingsData?.stilling?.properties?.extent ?? '',
      omfangProsent: stillingsData?.stilling?.properties?.jobpercentage ?? null,
      sektor: stillingsData?.stilling?.properties?.sector ?? '',
      antallStillinger:
        Number(stillingsData?.stilling?.properties?.positioncount) ?? null,
      oppstart: oppstartEtterAvtale ? null : oppstartDato || null,
      oppstartEtterAvtale,
      søknadsfristSnarest,
      søknadsfrist: søknadsfristSnarest ? null : søknadsfristDato || null,
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
      stillingType: stillingsData?.stilling?.privacy ?? 'INTERNAL_NOT_SHOWN',
      epost: stillingsData?.stilling?.properties?.applicationemail ?? null,
      lenke: stillingsData?.stilling?.properties?.applicationurl ?? null,
    },
  };
};

export const mapFormTilStilling = (
  formData: StillingsDataForm,
  existingData: StillingsDataDTO,
) => {
  const harNyJanzz =
    !existingData.stilling.categoryList?.length ||
    existingData.stilling.categoryList?.some(
      (i) =>
        i.categoryType === 'JANZZ' &&
        i.code !==
          formData.omStillingen.categoryList.find(
            (j) => j.categoryType === 'JANZZ',
          )?.code,
    );

  const publiseringsDato = formData.innspurt.publiseres
    ? format(
        parse(formData.innspurt.publiseres, 'dd.MM.yyyy', new Date()),
        "yyyy-MM-dd'T'HH:mm:ss",
      )
    : null;

  const avsluttesDato = formData.innspurt.avsluttes
    ? format(
        parse(formData.innspurt.avsluttes, 'dd.MM.yyyy', new Date()),
        "yyyy-MM-dd'T'HH:mm:ss",
      )
    : null;

  return {
    stillingsinfoid: existingData.stillingsinfo?.stillingsinfoid,
    stilling: {
      ...existingData.stilling,

      categoryList: harNyJanzz
        ? formData.omStillingen.categoryList
        : (existingData.stilling.categoryList ?? []),
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
        tags: JSON.stringify(formData.omTilrettelegging?.tags),
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
      published: publiseringsDato,
      expires: avsluttesDato,
      locationList: [
        ...(formData.omStillingen.adresser ?? []),
        ...(formData.omStillingen.lokasjoner ?? []),
      ],
      privacy: formData.innspurt.stillingType,
    },
  };
};
