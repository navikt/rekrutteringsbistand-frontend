import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import {
  postLocationDTO,
  usePostData,
} from '../api/stilling/geografi/postData/usePostData';
import SWRLaster from './SWRLaster';

export interface PoststedProps {
  callBack: (poststed: postLocationDTO) => void;
}

const Poststed: React.FC<PoststedProps> = ({ callBack }) => {
  const hook = usePostData();

  return (
    <SWRLaster hook={hook}>
      {(data) => (
        <UNSAFE_Combobox
          label='Velg postnummer og poststed'
          options={data.map((item) => {
            return {
              label: `${item.postalCode} - ${item.capitalizedCityName}`,
              value: item.postalCode,
            };
          })}
          shouldAutocomplete
          onChange={(value) => {
            const poststed = data.find((item) => item.postalCode === value);
            if (poststed) {
              callBack(poststed);
            }
          }}
        />
      )}
    </SWRLaster>
  );
};

export default Poststed;
