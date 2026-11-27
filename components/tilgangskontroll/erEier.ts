import type {
  StillingsinfoDTO,
  StillingSchemaDTO,
} from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

export type EierStillingsData = Partial<
  Pick<StillingSchemaDTO, 'source' | 'administration'>
> & {
  eierNavident?: string | null;
  stillingsinfo?: StillingsinfoDTO | null;
  stilling?: Partial<Pick<StillingSchemaDTO, 'source' | 'administration'>>;
};

interface IeierStilling {
  stillingsData?: EierStillingsData | null;
  navIdent?: string;
}

export const eierStilling = ({ stillingsData, navIdent }: IeierStilling) => {
  if (!navIdent) {
    return false;
  }
  if (stillingsData?.eierNavident === navIdent) {
    return true;
  }
  if (stillingsData?.stillingsinfo?.eierNavident === navIdent) {
    return true;
  }

  const erDirektemeldt =
    stillingsData?.stilling?.source === 'DIR' ||
    stillingsData?.source === 'DIR';

  if (erDirektemeldt) {
    if (stillingsData?.administration?.navIdent === navIdent) {
      return true;
    }
    if (stillingsData?.stilling?.administration?.navIdent === navIdent) {
      return true;
    }
  }

  return false;
};
