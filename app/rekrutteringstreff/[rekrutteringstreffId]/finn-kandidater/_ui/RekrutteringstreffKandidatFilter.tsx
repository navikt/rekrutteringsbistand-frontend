'use client';

import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import Arbeidserfaring from '@/app/kandidat/kandidat-søk-filter/_ui/Arbeidserfaring';
import Arbeidsønsker from '@/app/kandidat/kandidat-søk-filter/_ui/Arbeidsønsker';
import FritekstSøk from '@/app/kandidat/kandidat-søk-filter/_ui/FritekstSøk';
import Førerkort from '@/app/kandidat/kandidat-søk-filter/_ui/Førerkort';
import Hovedmål from '@/app/kandidat/kandidat-søk-filter/_ui/Hovedmål';
import Innsatsgrupper from '@/app/kandidat/kandidat-søk-filter/_ui/Innsatsgrupper';
import KandidatStedSøk from '@/app/kandidat/kandidat-søk-filter/_ui/KandidatStedSøk';
import Kompetanse from '@/app/kandidat/kandidat-søk-filter/_ui/Kompetanse';
import Omfang from '@/app/kandidat/kandidat-søk-filter/_ui/OmfangValg';
import PrioriterteMålgrupper from '@/app/kandidat/kandidat-søk-filter/_ui/PrioriterteMålgrupper';
import Språk from '@/app/kandidat/kandidat-søk-filter/_ui/Språk';
import Utdanningsnivå from '@/app/kandidat/kandidat-søk-filter/_ui/Utdanningsnivå';
import { Tabs } from '@navikt/ds-react';
import { ReactNode } from 'react';

type FilterKategori = {
  value: string;
  label: string;
  antallValgte: number;
  innhold: ReactNode;
};

export default function RekrutteringstreffKandidatFilter() {
  const filter = useKandidatSøkFilterContext();

  const filterKategorier: FilterKategori[] = [
    {
      value: 'sok',
      label: 'Søk',
      antallValgte:
        (filter.fritekst ? 1 : 0) +
        filter.ønsketYrke.length +
        filter.ønsketSted.length +
        filter.kompetanse.length,
      innhold: (
        <>
          <FritekstSøk />
          <Arbeidsønsker />
          <KandidatStedSøk />
          <Kompetanse />
        </>
      ),
    },
    {
      value: 'kvalifikasjoner',
      label: 'Kvalifikasjoner',
      antallValgte:
        filter.førerkort.length +
        filter.språk.length +
        filter.arbeidserfaring.length +
        filter.utdanningsnivå.length,
      innhold: (
        <>
          <Førerkort />
          <Språk />
          <Arbeidserfaring />
          <Utdanningsnivå />
        </>
      ),
    },
    {
      value: 'oppfolging',
      label: 'Oppfølging',
      antallValgte:
        filter.hovedmål.length +
        filter.prioritertMålgruppe.length +
        filter.innsatsgruppe.length +
        filter.omfang.length,
      innhold: (
        <>
          <Hovedmål />
          <PrioriterteMålgrupper />
          <Innsatsgrupper />
          <Omfang />
        </>
      ),
    },
  ];

  return (
    <div className='flex flex-col gap-4'>
      <div className='space-y-1'>
        <p className='text-text-default text-sm font-semibold'>
          Filtrer jobbsøkere
        </p>
        <p className='text-text-subtle text-sm'>
          Samme søkefelt som før, gruppert i en venstremeny.
        </p>
      </div>

      <Tabs defaultValue={filterKategorier[0].value} size='small'>
        <Tabs.List>
          {filterKategorier.map((kategori) => (
            <Tabs.Tab
              key={kategori.value}
              value={kategori.value}
              label={
                kategori.antallValgte > 0
                  ? `${kategori.label} (${kategori.antallValgte})`
                  : kategori.label
              }
            />
          ))}
        </Tabs.List>

        {filterKategorier.map((kategori) => (
          <Tabs.Panel
            key={kategori.value}
            value={kategori.value}
            className='!pt-4'
          >
            <div className='rounded-lg border border-[var(--ax-border-neutral-subtle)] bg-[var(--ax-bg-default)] p-4'>
              <div className='flex flex-col gap-4'>{kategori.innhold}</div>
            </div>
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}
