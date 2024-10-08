import { Tabs } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { TilgangskontrollForInnhold } from '../../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Rolle } from '../../../types/Roller';
import { useKandidatSøkFilter } from '../KandidatSøkContext';

export enum KandidatSøkPortefølje {
  MINE_BRUKERE = 'minebrukere',
  VALGTE_KONTORER = 'valgtekontorer',
  MINE_KONTORER = 'minekontorer',
  MITT_KONTOR = 'mittkontor',
  ALLE = 'alle',
}

const PorteføljeTabs = ({
  children,
  stillingId,
}: {
  children: ReactNode;
  stillingId: string | null;
}) => {
  const { portefølje, setPortefølje } = useKandidatSøkFilter();
  // const { søkekriterier, setSearchParam } = useSøkekriterier();
  // const { tilgangskontrollErPå, eierSjekk } = useContext(ApplikasjonContext);
  // const { data, isLoading: isDecoratorLoading } = useDecorator();
  // const {
  //     stilling: rekrutteringsbistandstilling,
  //     isLoading: isStillingLoading,
  //     isError: isStillingError,
  // } = useHentStilling(stillingId);

  // const erEier =
  //     eierSjekk(rekrutteringsbistandstilling?.stilling) ||
  //     eierSjekk(rekrutteringsbistandstilling?.stillingsinfo);

  // const knyttetTilStillingOgIkkeEier = !!stillingId && !erEier;

  // const velgPortefølje = (portefølje: string) => {
  //     setSearchParam(FilterParam.Portefølje, portefølje);
  // };

  // if (isDecoratorLoading || isStillingLoading) {
  //     return <Loader />;
  // }

  // if (isStillingError) {
  //     return <ErrorMessage>{'Feil ved lasting av stilling'}</ErrorMessage>;
  // }

  const data = {
    enheter: [],
  };

  const MineBrukere = () => (
    <Tabs.Tab value={KandidatSøkPortefølje.MINE_BRUKERE} label='Mine brukere' />
  );

  const MittKontor = () => {
    if (data?.enheter && data.enheter.length > 0) {
      return (
        <TilgangskontrollForInnhold
          skjulVarsel
          kreverEnAvRollene={[
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
          ]}
        >
          <Tabs.Tab
            value={KandidatSøkPortefølje.MITT_KONTOR}
            label='Mitt kontor'
          />
        </TilgangskontrollForInnhold>
      );
    }
    return null;
  };

  const MineKontorer = () => {
    if (data?.enheter && data.enheter.length > 1) {
      return (
        <TilgangskontrollForInnhold
          skjulVarsel
          kreverEnAvRollene={[
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
          ]}
        >
          <Tabs.Tab
            value={KandidatSøkPortefølje.MINE_KONTORER}
            label='Mine kontorer'
          />
        </TilgangskontrollForInnhold>
      );
    }
    return null;
  };

  const AlleKontorer = () => (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ]}
      //   manglerEierskap={knyttetTilStillingOgIkkeEier}
    >
      <Tabs.Tab value={KandidatSøkPortefølje.ALLE} label='Alle kontorer' />
    </TilgangskontrollForInnhold>
  );

  const VelgKontor = () => (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ]}
      //   manglerEierskap={knyttetTilStillingOgIkkeEier}
    >
      <div>tbd</div>
      {/* <VelgKontorTab søkekriterier={søkekriterier} /> */}
    </TilgangskontrollForInnhold>
  );

  return (
    <Tabs value={portefølje} onChange={setPortefølje}>
      <Tabs.List>
        <MineBrukere />
        <MittKontor />
        <MineKontorer />
        <AlleKontorer />
        <VelgKontor />
      </Tabs.List>
      <Tabs.Panel value={portefølje}>{children}</Tabs.Panel>
    </Tabs>
  );
};

export default PorteføljeTabs;
