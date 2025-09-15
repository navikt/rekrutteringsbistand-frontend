'use client';

/**
 * Endepunkt /useEndreKandidatUtfall
 */
import { KandidatAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';
import { Server } from 'miragejs/server';

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

export const formidleUsynligKandidatMirage = (server: Server) => {
  return server.post(formidleUsynligKandidatEndepunkt('*'), () => ({
    message: 'Kandidaten er formidlet',
  }));
};
