import {
  GeografiType,
  PamGeografi,
} from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { useStillingssøk } from '@/app/api/stillings-sok/useStillingssøk';
import { storBokstavSted } from '@/app/kandidat/util';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import React, { Fragment } from 'react';

interface IFylkerOgKommuner {
  geografi: PamGeografi[];
  hideLegend?: boolean;
}

const FylkerOgKommunerFilter: React.FC<IFylkerOgKommuner> = ({
  geografi,
  hideLegend,
}) => {
  const filterCtx = useStillingsSøkFilter();
  const { fylker, setFylker, kommuner, setKommuner } = filterCtx;
  const {
    brukerData: { ident },
    valgtNavKontor,
  } = useApplikasjonContext();
  const combined = useStillingssøk({
    filter: filterCtx,
    eierNavKontorEnhetId: valgtNavKontor?.navKontor,
    navIdent: ident,
    formidlinger: filterCtx.formidlinger,
  });
  const fylkeBuckets: Array<{ key: string; count: number }> =
    combined.data?.antall?.geografi?.fylker || [];
  const kommuneBuckets: Array<{ key: string; count: number }> =
    combined.data?.antall?.geografi?.kommuner || [];
  const fylkeCount = (f: string | null) =>
    f ? (fylkeBuckets.find((b) => String(b.key) === String(f))?.count ?? 0) : 0;
  const kommuneCount = (k: string | null) =>
    k ? (kommuneBuckets.find((b) => b.key === k)?.count ?? 0) : 0;
  const fylkeTotalWithKommuner = (f: string | null) => {
    if (!f) return 0;
    const base = fylkeCount(f);
    const kommunerISammeFylke = kommuneBuckets.filter((b) =>
      // norske kommunekoder starter med fylkesnummer (to siffer / ev. nye 2-siffer prefiks)
      String(b.key).startsWith(String(f)),
    );
    const sumKommuner = kommunerISammeFylke.reduce(
      (acc, k) => acc + k.count,
      0,
    );
    // Hvis dokumenter allerede kun finnes på kommunenivå vil base typisk være 0; hvis begge finnes risikerer vi duplisering.
    // Bruk heuristikk: dersom base < sumKommuner * 0.1, anta at base er uavhengig og legg til; ellers prioriter kommunesummer.
    if (base === 0) return sumKommuner;
    if (sumKommuner === 0) return base;
    return base < sumKommuner * 0.1 ? sumKommuner : sumKommuner; // velg kommunesum som representativ total
  };
  const fylkerMedKommuner = geografi
    ?.filter((g) => g.type === GeografiType.FYLKE)
    ?.map((fylke) => ({
      ...fylke,
      kommuner: geografi
        ?.filter((g) => g.type === GeografiType.KOMMUNE)
        ?.filter(
          (kommune: PamGeografi) =>
            fylke.lokasjon.fylkesnummer === kommune.lokasjon.fylkesnummer,
        )
        .sort((a: PamGeografi, b: PamGeografi) => a.navn.localeCompare(b.navn)),
    }))
    .sort((a: PamGeografi, b: PamGeografi) => a.navn.localeCompare(b.navn));
  return (
    <CheckboxGroup
      size='small'
      hideLegend={hideLegend}
      legend='Område'
      value={fylker || []}
      onChange={setFylker}
    >
      {fylkerMedKommuner?.map((fylke) => (
        <Fragment key={fylke.lokasjon.fylkesnummer}>
          <Checkbox value={fylke.lokasjon.fylkesnummer}>
            {storBokstavSted(fylke.navn)} (
            {fylkeTotalWithKommuner(fylke.lokasjon.fylkesnummer)})
          </Checkbox>
          {fylke.lokasjon.fylkesnummer &&
            fylker.includes(fylke.lokasjon.fylkesnummer) &&
            fylke.kommuner &&
            fylke.kommuner.length > 1 && (
              <CheckboxGroup
                className='ml-4'
                onChange={setKommuner}
                hideLegend
                legend={`Velg kommuner i ${storBokstavSted(fylke.navn)}`}
                value={kommuner || []}
              >
                {fylke.kommuner.map((kommune: PamGeografi) => (
                  <Checkbox
                    key={kommune.lokasjon.kommunenummer}
                    value={kommune.lokasjon.kommunenummer}
                  >
                    {storBokstavSted(kommune.navn)} (
                    {kommuneCount(kommune.lokasjon.kommunenummer)})
                  </Checkbox>
                ))}
              </CheckboxGroup>
            )}
        </Fragment>
      ))}
    </CheckboxGroup>
  );
};

export default FylkerOgKommunerFilter;
