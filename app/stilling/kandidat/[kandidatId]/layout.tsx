import { TilgangskontrollForInnhold } from '../../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../../components/tilgangskontroll/roller';
import { KandidatContextProvider } from '../../../kandidat/[kandidatId]/KandidatContext';

export default async function StillingForKandidatLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { kandidatId: string };
}) {
  const kandidatId = params.kandidatId;

  if (!kandidatId) {
    return null;
  }
  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      <KandidatContextProvider kandidatId={kandidatId}>
        {children}
        {/* <KandidatSideLayout>{children}</KandidatSideLayout> */}
      </KandidatContextProvider>
    </TilgangskontrollForInnhold>
  );
}
