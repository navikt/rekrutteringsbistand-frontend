import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { HovedMålType } from '@/app/kandidat/_util/kandidatsøk-typer';
import ValgteFiltre, { FilterItem } from '@/components/filter/ValgteFiltre';

export default function KandidatSøkChips() {
  const filter = useKandidatSøkFilterContext();

  const filtre: FilterItem[] = [
    {
      type: filter.ønsketYrke,
      setVerdi: filter.setØnsketYrke,
    },
    {
      type: filter.ønsketSted,
      setVerdi: filter.setØnsketSted,
    },
    {
      type: filter.innsatsgruppe,
      setVerdi: filter.setInnsatsgruppe,
    },
    {
      type: filter.hovedmål,
      setVerdi: filter.setHovedmål,
      mapVerdiNavn: (navn: string) =>
        Object.keys(HovedMålType).find(
          (key) => HovedMålType[key as keyof typeof HovedMålType] === navn,
        ) || navn,
    },
    {
      type: filter.kompetanse,
      setVerdi: filter.setKompetanse,
    },
    {
      type: filter.førerkort,
      setVerdi: filter.setFørerkort,
    },
    {
      type: filter.språk,
      setVerdi: filter.setSpråk,
    },
    {
      type: filter.arbeidserfaring,
      setVerdi: filter.setArbeidserfaring,
    },
    {
      type: filter.utdanningsnivå,
      setVerdi: filter.setUtdanningsnivå,
    },
    {
      type: filter.prioritertMålgruppe,
      setVerdi: filter.setPrioritertMålgruppe,
    },
    {
      type: filter.omfang,
      setVerdi: filter.setOmfang,
    },
  ];

  if (filter.fritekst.length > 0) {
    filtre.unshift({
      type: [...filter.fritekst],
      setVerdi: filter.setFritekstListe,
    });
  }

  return (
    <div className='my-2 w-full'>
      <ValgteFiltre
        filtre={filtre}
        tømFiltreProps={
          filter.lagredeSøk
            ? { fjernAlle: filter.fjernAlleFiltre }
            : { fjernFritekst: () => filter.setFritekstListe([]) }
        }
      />
    </div>
  );
}
