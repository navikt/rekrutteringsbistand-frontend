import {
  GeografiType,
  PamGeografi,
} from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { storBokstavSted } from '@/app/kandidat/util';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
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
  const { fylker, setFylker, kommuner, setKommuner } = useStillingsSøkFilter();
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
            {storBokstavSted(fylke.navn)}
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
                    {storBokstavSted(kommune.navn)}
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
