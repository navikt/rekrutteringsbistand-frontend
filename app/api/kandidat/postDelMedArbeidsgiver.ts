'use client';
/**
 * Endepunkt /useDelMedArbeidsgiver
 */
import { KandidatAPI } from '../api-routes';
import { postApi } from '../fetcher';

const delMedArbeidsgiverEndepunkt = (kandidatlisteId: string) =>
  `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/deltekandidater`;

export interface DelMedKandidatProps {
  mailadresser: string[];
  kandidatlisteId: string;
  kandidatnummerListe: string[];
  navKontor: string;
}

export const postDelMedArbeidsgiver = async (
  props: DelMedKandidatProps,
): Promise<Response> =>
  await postApi(delMedArbeidsgiverEndepunkt(props.kandidatlisteId), {
    epostMottakere: props.mailadresser,
    epostTekst: '',
    kandidater: props.kandidatnummerListe,
    navKontor: props.navKontor,
  });
