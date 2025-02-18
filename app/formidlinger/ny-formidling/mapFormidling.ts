import { format } from 'date-fns';
import { StillingsDataDTO } from '../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
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
      categoryList: formData.omFormidling.categoryList,
      status: 'ACTIVE',
      firstPublished: true,
      properties: {
        ...stillingInfo.stilling.properties,
        tags: JSON.stringify(formData.omTilrettelegging?.tags),
        sector: formData.omFormidling.sektor,
        positioncount: formData.omKandiatene.length,
        starttime: datoIDag,
        applicationdue: datoIDag,
        engagementtype: formData.omFormidling.ansettelsesform,
        extent: formData.omFormidling.omfangKode,
        jobpercentage: formData.omFormidling.omfangProsent,
        jobarrangement: formData.omFormidling.arbeidstidsordning,
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
        ...(formData.omFormidling.adresseLokasjoner ?? []),
        ...(formData.omFormidling.lokasjoner ?? []),
      ],
      source: 'DIR',
    },
  };
};
