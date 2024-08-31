import * as React from 'react';
import { z } from 'zod';
import SWRLaster from '../../../../components/SWRLaster';
import { useGeografi } from '../../../api/stilling/geografi/geografi';
import { fylkeSchema, kommuneSchema } from '../../../api/stilling/geografi/zod';
import FylkerOgKommuner from './FylkerOgKommunerFilter';

export interface IGeografiFilter {
  children?: React.ReactNode | undefined;
}

export type KommuneDTO = z.infer<typeof kommuneSchema>;
export type FylkeDTO = z.infer<typeof fylkeSchema>;

export interface FylkeMedKommuneDTO extends FylkeDTO {
  kommuner: KommuneDTO[] | undefined;
}
const GeografiFilter: React.FC<IGeografiFilter> = ({ children }) => {
  const hook = useGeografi();
  return (
    <SWRLaster hook={hook}>
      {(data) => {
        const fylkerMedKommuner = data.fylker
          ?.map((fylke: FylkeDTO) => {
            return {
              ...fylke,
              kommuner: data.kommuner
                ?.filter((kommune: KommuneDTO) => {
                  return fylke.code === kommune.countyCode;
                })
                .sort((a: KommuneDTO, b: KommuneDTO) =>
                  a.name.localeCompare(b.name),
                ),
            };
          })
          .sort((a: FylkeDTO, b: FylkeDTO) => a.name.localeCompare(b.name));
        return (
          <div>
            <FylkerOgKommuner fylkerMedKommuner={fylkerMedKommuner} />
          </div>
        );
      }}
    </SWRLaster>
  );
};

export default GeografiFilter;
