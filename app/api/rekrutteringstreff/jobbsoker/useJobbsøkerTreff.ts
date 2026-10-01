'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApiWithSchema } from '@/app/api/fetcher';
import { JobbsøkerStatusEnum } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { RekrutteringstreffKategori } from '@/app/rekrutteringstreff/_types/constants';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const JobbsøkerTreffHistorikkSchema = z.array(
  z.object({
    id: z.uuid().nullable(),
    tittel: z.string(),
    lagtTilTidspunkt: z.string().nullable(),
    treffStartTidspunkt: z.string().nullable(),
    lagtTilAvNavn: z.string().nullable(),
    lagtTilAvIdent: z.string().nullable(),
    status: JobbsøkerStatusEnum,
    kategori: z.enum(RekrutteringstreffKategori),
    antallArbeidsgivere: z.number(),
  }),
);

export type JobbsøkerTreffHistorikk = z.infer<
  typeof JobbsøkerTreffHistorikkSchema
>[number];

const hentJobbsøkerTreff = postApiWithSchema(JobbsøkerTreffHistorikkSchema);

export function useJobbsøkerTreff(fødselsnummer: string | null) {
  const [resultat, setResultat] = useState<{
    data?: JobbsøkerTreffHistorikk[];
    feil?: boolean;
  }>({});

  useEffect(() => {
    if (!fødselsnummer) return;

    let aktiv = true;

    hentJobbsøkerTreff({
      url: `${RekrutteringstreffAPI.internUrl}/jobbsoker/treff`,
      body: { fødselsnummer },
    }).then(
      (data) => {
        if (aktiv) setResultat({ data });
      },
      () => {
        if (aktiv) setResultat({ feil: true });
      },
    );

    return () => {
      aktiv = false;
    };
  }, [fødselsnummer]);

  return fødselsnummer ? resultat : { feil: true };
}
