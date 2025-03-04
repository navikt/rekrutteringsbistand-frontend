'use client';

/**
 * Endepunkt /useEndreKandidatUtfall
 */
import { KandidatAPI } from '../api-routes';
import { Server } from 'miragejs/server';

//TODO
export const formidleKandidatEndepunkt = () => ``;

export const formidleUsynligKandidatEndepunkt = (kandidatlisteId: string) =>
  `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/formidlingeravusynligkandidat`;

export interface FormidlingUsynligKandidatDTO {
  fnr: string;
  fåttJobb: boolean;
  navKontor: string;
  stillingsId: string;
}

export const formidleUsynligKandidatMirage = (server: Server) => {
  return server.post(formidleUsynligKandidatEndepunkt('*'), () => ({
    message: 'Kandidaten er formidlet',
  }));
};
