import { StillingsDataDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

import {
  ContactSchemaDTO,
  GeografiDTO,
} from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { InkluderingsTag } from '../omStillingen/StillingSidebar/StillingInkludering';

export interface StillingsDataForm {
  omVirksomheten: {
    beskrivelse: string;
    kontaktPersoner: ContactSchemaDTO[];
  };
  omTilrettelegging: {
    statligeInkluderingsdugnade: boolean | null;
    tags: string[];
  };
  omStillingen: {
    tittel: string;
    beskrivelse: string;
    arbeidssted: {
      adresse: GeografiDTO | null;
      kommuneEllerLand: string | null;
    };
  };
  praktiskInfo: {
    sektor: string;
    antallStillinger: number;
    oppstart: string;
    oppstartSnarest: boolean;
    søknadsfrist: string;
    søknadsfristEtterAvtale: boolean;
    ansettelsesform: string;
    dager: string[];
    tid: string[];
  };
  innspurt: {
    publiseres: string | null;
    avsluttes: string | null;
    stillingType: string | null;
  };
}

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
        adresse: null,
        kommuneEllerLand: null,
      },
    },
    praktiskInfo: {
      sektor: stillingsData?.stilling?.properties?.sector ?? '',
      antallStillinger: parseInt(
        stillingsData?.stilling?.properties?.positioncount?.toString() ?? '0',
      ),
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
      publiseres: stillingsData?.stilling?.published ?? null,
      avsluttes: stillingsData?.stilling?.expires ?? null,
      stillingType: stillingsData?.stilling?.source ?? null,
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
      contactList: formData.omVirksomheten.kontaktPersoner,
      properties: {
        ...existingData.stilling.properties,
        employerdescription: formData.omVirksomheten.beskrivelse,
        tags: JSON.stringify(formData.omTilrettelegging.tags),
        adtext: formData.omStillingen.beskrivelse,
        sector: formData.praktiskInfo.sektor,
        positioncount: formData.praktiskInfo.antallStillinger.toString(),
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
      published: formData.innspurt.publiseres,
      expires: formData.innspurt.avsluttes,
      source: formData.innspurt.stillingType,
    },
  };
};
