'use client';
/**
 * Endepunkt /useEndreKandidatUtfall
 */
import { KandidatAPI } from '../api-routes';
import { putApi } from '../fetcher';

export const formidleUsynligKandidatEndepunkt = (
  kandidatlisteId: string,
  formidlingId: string,
) =>
  `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/formidlingeravusynligkandidat/${formidlingId}/utfall`;

export interface EndreKandidatUtfallProps {
  utfall: string;
  navKontor: string;
  kandidatlisteId: string;
  formidlingId: string;
}

export const formidleUsynligKandidat = (props: EndreKandidatUtfallProps) =>
  putApi(
    formidleUsynligKandidatEndepunkt(props.kandidatlisteId, props.formidlingId),
    {
      body: JSON.stringify({
        utfall: props.utfall,
        navKontor: props.navKontor,
      }),
    },
  );
