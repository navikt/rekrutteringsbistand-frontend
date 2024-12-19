import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import {
  postLocationDTO,
  usePostData,
} from '../api/stilling/geografi/postData/usePostData';

export interface PoststedProps {
  callBack: (poststed: postLocationDTO) => void;
}

const Poststed: React.FC<PoststedProps> = ({ callBack }) => {
  const hook = usePostData();

  const [søkeVerdi, setSøkeVerdi] = React.useState<string>('');

  return (
    <UNSAFE_Combobox
      value={søkeVerdi}
      label='Velg postnummer og poststed'
      isLoading={hook.isLoading}
      options={
        hook.data
          ? hook.data.map((item) => {
              return {
                label: `${item.postalCode} - ${item.capitalizedCityName}`,
                value: item.postalCode,
              };
            })
          : []
      }
      shouldAutocomplete
      onChange={(value) => {
        setSøkeVerdi(value);
      }}
      isListOpen={søkeVerdi.length > 1}
      onToggleSelected={(value) => {
        const poststed = hook.data
          ? hook.data.find((item) => item.postalCode === value)
          : null;
        if (poststed) {
          callBack(poststed);
        }
      }}
    />
  );
};

export default Poststed;
