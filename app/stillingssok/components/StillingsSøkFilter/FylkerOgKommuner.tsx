import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { Fragment } from 'react';

import { useQueryState } from 'nuqs';
import React from 'react';
import { parseAsArray, serializeArray } from '../../../../util/array';
import { FylkeMedKommuneDTO, KommuneDTO } from './GeografiFilter';

interface IFylkerOgKommuner {
  fylkerMedKommuner: FylkeMedKommuneDTO[] | undefined;
}

const FylkerOgKommuner: React.FC<IFylkerOgKommuner> = ({
  fylkerMedKommuner,
}) => {
  const [valgteFylker, setValgteFylker] = useQueryState('fylker', {
    parse: parseAsArray,
    serialize: serializeArray,
  });
  const [valgteKommuner, setValgteKommuner] = useQueryState('kommuner', {
    parse: parseAsArray,
    serialize: serializeArray,
  });

  const setFylkeFilter = (v: string[]) => {
    if (v.length === 0) {
      setValgteFylker(null);
    }
    setValgteFylker(v);
  };

  const setKommuneFilter = (v: string[]) => {
    if (v.length === 0) {
      setValgteKommuner(null);
    }
    setValgteKommuner(v);
  };

  return (
    <CheckboxGroup
      legend='Område'
      value={valgteFylker || []}
      onChange={setFylkeFilter}
    >
      {fylkerMedKommuner?.map((fylke: FylkeMedKommuneDTO) => (
        <Fragment key={fylke.code}>
          <Checkbox value={fylke.code}>{fylke.capitalizedName}</Checkbox>
          {valgteFylker &&
            valgteFylker.includes(fylke.code) &&
            fylke.kommuner &&
            fylke.kommuner.length > 1 && (
              <CheckboxGroup
                className='ml-4'
                onChange={setKommuneFilter}
                hideLegend
                legend={`Velg kommuner i ${fylke}`}
                value={valgteKommuner || []}
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

export default FylkerOgKommuner;
