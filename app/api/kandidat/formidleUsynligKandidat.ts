'use client';
/**
 * Endepunkt /useEndreKandidatUtfall
 */
import { KandidatAPI } from '../api-routes';

export const formidleUsynligKandidatEndepunkt = (kandidatlisteId: string) =>
  `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/formidlingeravusynligkandidat`;

export interface EndreKandidatUtfallProps {
  fnr: string;
  fåttJobb: boolean;
  navKontor: string;
  stillingsId: string;
}

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
