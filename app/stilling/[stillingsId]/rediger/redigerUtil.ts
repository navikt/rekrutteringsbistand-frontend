import { StillingsDataDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

import { InkluderingsTag } from '../omStillingen/StillingSidebar/StillingInkludering';
import { StillingsDataForm } from './redigerFormType.zod';

export const mapStillingTilForm = (
  stillingsData: StillingsDataDTO,
): StillingsDataForm => {
  const tags = stillingsData.stilling.properties?.tags
    ? JSON.parse(stillingsData.stilling.properties.tags)
    : [];

  const workhours = stillingsData.stilling.properties?.workhours
    ? JSON.parse(stillingsData.stilling.properties.workhours)
    : [];

  const workday = stillingsData.stilling.properties?.workday
    ? JSON.parse(stillingsData.stilling.properties.workday)
    : [];
  return {
    omVirksomheten: {
      beskrivelse:
        stillingsData?.stilling?.properties?.employerdescription?.toString() ??
        '',
      kontaktPersoner: stillingsData?.stilling?.contactList ?? [],
    },
    omTilrettelegging: {
      statligeInkluderingsdugnade: tags.includes(
        InkluderingsTag.StatligInkluderingsdugnad,
      ),
      tags: tags,
    },
    omStillingen: {
      tittel: stillingsData?.stilling?.title ?? '',
      beskrivelse: stillingsData?.stilling?.properties?.adtext ?? '',
      arbeidssted: {
        adresse: stillingsData?.stilling?.employer?.location?.address ?? null,
        kommuneEllerLand: null,
        postnummer:
          stillingsData?.stilling?.employer?.location?.postalCode ?? null,
      },
    },
    praktiskInfo: {
      sektor: stillingsData?.stilling?.properties?.sector ?? '',
      antallStillinger:
        stillingsData?.stilling?.properties?.positioncount?.toString() ?? '0',
      oppstart:
        stillingsData?.stilling?.properties?.starttime?.toString() ?? '',
      oppstartSnarest:
        stillingsData?.stilling?.properties?.starttime === 'Snarest',
      søknadsfrist:
        stillingsData?.stilling?.properties?.applicationdue?.toString() ?? '',
      søknadsfristEtterAvtale:
        stillingsData?.stilling?.properties?.applicationdue === 'etterAvtale',
      ansettelsesform:
        stillingsData?.stilling?.properties?.engagementtype ?? '',
      dager: workday,
      tid: workhours,
    },
    innspurt: {
      publiseres: stillingsData?.stilling?.published ?? '',
      avsluttes: stillingsData?.stilling?.expires ?? '',
      stillingType: stillingsData?.stilling?.source ?? '',
    },
  };
};

export const mapFormTilStilling = (
  formData: StillingsDataForm,
  existingData: StillingsDataDTO,
): StillingsDataDTO => {
  return {
    ...existingData,
    stilling: {
      ...existingData.stilling,
      title: formData.omStillingen.tittel,
      contactList: formData.omVirksomheten.kontaktPersoner.map((contact) => ({
        ...contact,
        email: contact.email ?? null,
        phone: contact.phone ?? null,
      })),
      properties: {
        ...existingData.stilling.properties,
        employerdescription: formData.omVirksomheten.beskrivelse,
        tags: JSON.stringify(formData.omTilrettelegging.tags),
        adtext: formData.omStillingen.beskrivelse,
        sector: formData.praktiskInfo.sektor,
        positioncount: formData.praktiskInfo.antallStillinger,
        starttime: formData.praktiskInfo.oppstartSnarest
          ? 'Snarest'
          : formData.praktiskInfo.oppstart,
        applicationdue: formData.praktiskInfo.søknadsfristEtterAvtale
          ? 'etterAvtale'
          : formData.praktiskInfo.søknadsfrist,
        engagementtype: formData.praktiskInfo.ansettelsesform,
        workday: JSON.stringify(formData.praktiskInfo.dager),
        workhours: JSON.stringify(formData.praktiskInfo.tid),
      },
      employer: {
        ...existingData.stilling.employer,
        //@ts-ignore
        location: {
          ...existingData.stilling.employer?.location,
          postalCode: formData.omStillingen.arbeidssted.postnummer,
          address: formData.omStillingen.arbeidssted.adresse,
        },
      },
      published: formData.innspurt.publiseres
        ? new Date(formData.innspurt.publiseres).toISOString()
        : null,
      expires: formData.innspurt.avsluttes
        ? new Date(formData.innspurt.avsluttes).toISOString()
        : null,
      source: formData.innspurt.stillingType,
    },
  };
};
