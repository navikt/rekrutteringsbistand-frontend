import { FormidlingDataForm } from './redigerFormidlingFormType';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { StillingsStatus } from '@/app/stilling/stilling-typer';
import { format } from 'date-fns';

export const mapFormTilFormidling = (
  formData: FormidlingDataForm,
  stillingsinfo: StillingsDataDTO,
): StillingsDataDTO => {
  const datoIDag = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
  return {
    ...stillingsinfo,
    stillingsinfo: null,
    stilling: {
      ...stillingsinfo.stilling,
      categoryList: formData.omFormidlingen?.categoryList ?? [],
      // status: 'ACTIVE',
      status: StillingsStatus.Stoppet,
      firstPublished: true,
      properties: {
        ...stillingsinfo.stilling.properties,
        tags: JSON.stringify(formData.omTilrettelegging?.tags),
        sector: formData.omFormidlingen.sektor,
        positioncount: formData.omKandidatene.length,
        starttime: datoIDag,
        applicationdue: datoIDag,
        engagementtype: formData.omFormidlingen.ansettelsesform,
        extent: formData.omFormidlingen.omfangKode,
        jobpercentage: formData.omFormidlingen.omfangProsent,
        jobarrangement: formData.omFormidlingen.arbeidstidsordning,
      },
      published: datoIDag,
      expires: datoIDag,
      administration: {
        ...stillingsinfo.stilling.administration!,
        status: 'DONE',
        id: stillingsinfo.stilling.administration?.id ?? null,
        reportee: stillingsinfo.stilling.administration?.reportee ?? null,
        navIdent: stillingsinfo.stilling.administration?.navIdent ?? null,
        comments: stillingsinfo.stilling.administration?.comments ?? null,
        remarks: stillingsinfo.stilling.administration?.remarks ?? null,
      },
      locationList: [
        ...(formData.omFormidlingen.adresser ?? []),
        ...(formData.omFormidlingen.lokasjoner ?? []),
      ],
      source: 'DIR',
    },
  };
};
