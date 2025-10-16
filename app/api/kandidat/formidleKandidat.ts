'use client';

/**
 * Endepunkt /useEndreKandidatUtfall
 */
import { KandidatAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';

export const formidleUsynligKandidatEndepunkt = (kandidatlisteId: string) =>
  `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/formidlingeravusynligkandidat`;

export interface FormidlingUsynligKandidatDTO {
  fnr: string;
  fåttJobb: boolean;
  navKontor: string;
  stillingsId: string;
}

export const formidleUsynligKandidat = (
  kandidatlisteId: string,
  formidletKandidat: FormidlingUsynligKandidatDTO,
) => {
  return postApi(
    formidleUsynligKandidatEndepunkt(kandidatlisteId),
    formidletKandidat,
  );
};

export const formidleUsynligKandidatMSWHandler = http.post(
  formidleUsynligKandidatEndepunkt(':kandidatlisteId'),
  () => HttpResponse.json({ message: 'Kandidaten er formidlet' }),
);
