import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { Fragment } from 'react';

import React from 'react';
import {
  GeografiType,
  PamGeografi,
} from '../../../api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { storBokstavSted } from '../../../kandidat-sok/util';
import { useStillingsSøkFilter } from '../../StillingsSøkContext';

interface IFylkerOgKommuner {
  geografi: PamGeografi[];
}

const FylkerOgKommunerFilter: React.FC<IFylkerOgKommuner> = ({ geografi }) => {
  const { fylker, setFylker, kommuner, setKommuner } = useStillingsSøkFilter();

  // Sorter geografi og legg kommuner under fylker for checkbokser
  const fylkerMedKommuner = geografi
    ?.filter((g) => g.type === GeografiType.FYLKE)
    ?.map((fylke) => {
      return {
        ...fylke,
        kommuner: geografi
          ?.filter((g) => g.type === GeografiType.KOMMUNE)
          ?.filter((kommune: PamGeografi) => {
            return (
              fylke.lokasjon.fylkesnummer === kommune.lokasjon.fylkesnummer
            );
          })
          .sort((a: PamGeografi, b: PamGeografi) =>
            a.navn.localeCompare(b.navn),
          ),
      };
    })
    .sort((a: PamGeografi, b: PamGeografi) => a.navn.localeCompare(b.navn));

  return (
    <CheckboxGroup legend='Område' value={fylker || []} onChange={setFylker}>
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
