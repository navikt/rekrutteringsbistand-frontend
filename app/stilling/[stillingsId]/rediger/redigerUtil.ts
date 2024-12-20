import { formaterTilISODato } from '../../../../util/dato';
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
      janzz:
        (stillingsData?.stilling?.categoryList?.filter(
          (item) => item.code === 'janzz',
        ) as any) ?? [],
      beskrivelse: stillingsData?.stilling?.properties?.adtext ?? '',
      kommuneEllerLand: null,
      adresse:
        stillingsData?.stilling?.employer?.locationList?.[0]?.address ?? null,
      location: stillingsData?.stilling?.employer?.locationList?.[0] ?? null,
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
) => {
  const arbeidssted = [
    {
      ...formData.omStillingen.location,
      address: formData.omStillingen.adresse,
    },
  ];
  return {
    stillingsinfoid: existingData.stillingsinfo?.stillingsinfoid,
    stilling: {
      ...existingData.stilling,
      categoryList: [
        ...(existingData.stilling.categoryList ?? []),
        ...formData.omStillingen.janzz,
      ],
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
      published: formaterTilISODato(formData.innspurt.publiseres),
      expires: formaterTilISODato(formData.innspurt.avsluttes),
      locationList: [
        ...(existingData.stilling.locationList ?? []),
        ...arbeidssted,
      ],
      source: formData.innspurt.stillingType,
    },
  };
};
