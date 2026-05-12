import { getApiWithSchemaEs } from '@/app/api/fetcher';
import {
  ArbeidsgiverSchemaDTO,
  ArbeidsgiverDTO as PamArbeidsgiverDTO,
  ArbeidsgiverSchema as PamArbeidsgiverSchema,
} from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { RekbisError } from '@/util/rekbisError';
import { z } from 'zod';

const PamArbeidsgivereArraySchema = z.array(PamArbeidsgiverSchema);

export const finnArbeidsgiverViaOrgnr = async (
  orgnr: string,
): Promise<PamArbeidsgiverDTO> => {
  const data = await getApiWithSchemaEs(ArbeidsgiverSchemaDTO)({
    url: `/api/pam-search/underenhet?q=${orgnr}`,
  });
  const parsed = PamArbeidsgivereArraySchema.parse(data);
  const arbeidsgiver = parsed.find((a) => a.organisasjonsnummer === orgnr);
  if (!arbeidsgiver) {
    throw new RekbisError({
      message: `Fant ikke arbeidsgiver med orgnr ${orgnr} i pam-search`,
    });
  }
  return arbeidsgiver;
};
