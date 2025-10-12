import {
  hierarkiAvTagsForFilter,
  Hovedtag,
  Subtag,
  visningsnavnForFilter,
} from './StillingsSøkFilter/InkluderingFilter';
import {
  GeografiType,
  usePamGeografi,
} from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { storForbokstavString } from '@/app/kandidat/util';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import ValgteFiltre, { FilterItem } from '@/components/filter/ValgteFiltre';

export default function StillingsSøkChips() {
  const filter = useStillingsSøkFilter();
  const geografi = usePamGeografi();

  function geografiNavn(code: string): string {
    if (code.length === 2) {
      const region = geografi.data
        ?.filter((g) => g.type === GeografiType.FYLKE)
        .find((r) => r.lokasjon.fylkesnummer === code);
      return region ? region.navn : '';
    } else {
      const region = geografi.data
        ?.filter((g) => g.type === GeografiType.KOMMUNE)
        .find((r) => r.lokasjon.kommunenummer === code);
      return region ? region.navn : '';
    }
  }

  // Bygg opp FilterItem-array for ValgteFiltre
  const filtreItems: FilterItem[] = [];

  // Fritekst (array av fritekstverdier) – hvis det finnes
  if (filter.fritekst && filter.fritekst.length > 0) {
    filtreItems.push({
      type: [...filter.fritekst],
      setVerdi: (ny) => filter.setFritekstListe(ny),
    });
  }

  // Statuser
  if (filter.statuser.length > 0) {
    filtreItems.push({
      type: [...filter.statuser],
      setVerdi: (ny) => filter.setStatuser(ny),
      mapVerdiNavn: (v) => storForbokstavString(v),
    });
  }

  // Inkludering: grupper subtag chips samlet; hovedtagger uten aktive subtagger i egen gruppe
  const hovedMedSub: string[] = [];
  const hovedUtenSub: string[] = [];
  const subtagSamlet: string[] = [];

  filter.inkludering.forEach((hoved) => {
    const tagger = hierarkiAvTagsForFilter.find((g) => g.hovedtag === hoved);
    const aktiveSub = filter.inkluderingUnderkategori.filter((s) =>
      tagger?.subtags.includes(s as Subtag),
    );
    if (aktiveSub.length > 0) {
      hovedMedSub.push(hoved);
      subtagSamlet.push(...aktiveSub);
    } else {
      hovedUtenSub.push(hoved);
    }
  });

  if (subtagSamlet.length > 0) {
    filtreItems.push({
      type: [...subtagSamlet],
      setVerdi: (ny) => filter.setInkluderingUnderkategori(ny as Subtag[]),
      mapVerdiNavn: (v) => visningsnavnForFilter[v as Subtag] || v,
    });
  }
  if (hovedUtenSub.length > 0) {
    filtreItems.push({
      type: [...hovedUtenSub],
      setVerdi: (ny) => filter.setInkludering(ny as Hovedtag[]),
      mapVerdiNavn: (v) => visningsnavnForFilter[v as Hovedtag] || v,
    });
  }

  // Publisert
  if (filter.publisert.length > 0) {
    filtreItems.push({
      type: [...filter.publisert],
      setVerdi: (ny) => filter.setPublisert(ny),
      mapVerdiNavn: (v) => storForbokstavString(v),
    });
  }

  // Kategori
  if (filter.kategori.length > 0) {
    filtreItems.push({
      type: [...filter.kategori],
      setVerdi: (ny) => filter.setKategori(ny),
      mapVerdiNavn: (v) => storForbokstavString(v),
    });
  }

  // Fylker
  if (filter.fylker.length > 0) {
    filtreItems.push({
      type: [...filter.fylker],
      setVerdi: (ny) => filter.setFylker(ny),
      mapVerdiNavn: (v) => storForbokstavString(geografiNavn(v)),
    });
  }

  // Kommuner
  if (filter.kommuner.length > 0) {
    filtreItems.push({
      type: [...filter.kommuner],
      setVerdi: (ny) => filter.setKommuner(ny),
      mapVerdiNavn: (v) => storForbokstavString(geografiNavn(v)),
    });
  }

  return (
    <ValgteFiltre
      filtre={filtreItems}
      tømFiltreProps={{ fjernFritekst: () => filter.setFritekstListe([]) }}
    />
  );
}
