import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { Fragment } from 'react';

import React from 'react';
import { useStillingsSøkFilter } from '../../StillingsSøkContext';
import { FylkeMedKommuneDTO, KommuneDTO } from './GeografiFilter';

interface IFylkerOgKommuner {
  fylkerMedKommuner: FylkeMedKommuneDTO[] | undefined;
}

const FylkerOgKommunerFilter: React.FC<IFylkerOgKommuner> = ({
  fylkerMedKommuner,
}) => {
  const { fylker, setFylker, kommuner, setKommuner } = useStillingsSøkFilter();

  return (
    <CheckboxGroup legend='Område' value={fylker || []} onChange={setFylker}>
      {fylkerMedKommuner?.map((fylke: FylkeMedKommuneDTO) => (
        <Fragment key={fylke.code}>
          <Checkbox value={fylke.code}>{fylke.capitalizedName}</Checkbox>
          {fylker &&
            fylker.includes(fylke.code) &&
            fylke.kommuner &&
            fylke.kommuner.length > 1 && (
              <CheckboxGroup
                className='ml-4'
                onChange={setKommuner}
                hideLegend
                legend={`Velg kommuner i ${fylke}`}
                value={kommuner || []}
              >
                {fylke.kommuner.map((kommune: KommuneDTO) => (
                  <Checkbox key={kommune.code} value={kommune.code}>
                    {kommune.capitalizedName}
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
