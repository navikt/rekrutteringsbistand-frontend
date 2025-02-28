import { format } from 'date-fns';
import { StillingsDataDTO } from '../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { StillingsStatus } from '../../stilling/stilling-typer';
import { FormidlingDataForm } from './redigerFormidlingFormType';

export const mapFormTilFormidling = (
  formData: FormidlingDataForm,
  stillingInfo: StillingsDataDTO,
): StillingsDataDTO => {
  const datoIDag = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
  return {
    ...stillingInfo,
    stillingsinfo: null,
    stilling: {
      ...stillingInfo.stilling,
      categoryList: formData.omFormidlingen?.categoryList ?? [],
      // status: 'ACTIVE',
      status: StillingsStatus.Stoppet,
      firstPublished: true,
      properties: {
        ...stillingInfo.stilling.properties,
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
        ...stillingInfo.stilling.administration!,
        status: 'DONE',
        id: stillingInfo.stilling.administration?.id ?? null,
        reportee: stillingInfo.stilling.administration?.reportee ?? null,
        navIdent: stillingInfo.stilling.administration?.navIdent ?? null,
        comments: stillingInfo.stilling.administration?.comments ?? null,
        remarks: stillingInfo.stilling.administration?.remarks ?? null,
      },
      locationList: [
        ...(formData.omFormidlingen.adresser ?? []),
        ...(formData.omFormidlingen.lokasjoner ?? []),
      ],
      source: 'DIR',
    },
  };
};
