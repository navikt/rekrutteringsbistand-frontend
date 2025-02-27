'use client';
import { Server } from 'miragejs/server';
/**
 * Endepunkt /useEndreKandidatUtfall
 */
import { KandidatAPI } from '../api-routes';

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

// export const formidleUsynligKandidat = (props: EndreKandidatUtfallProps) =>
//   putApi(
//     formidleUsynligKandidatEndepunkt(props.kandidatlisteId, props.formidlingId),
//     {
//       body: JSON.stringify({
//         utfall: props.utfall,
//         navKontor: props.navKontor,
//       }),
//     },
//   );
