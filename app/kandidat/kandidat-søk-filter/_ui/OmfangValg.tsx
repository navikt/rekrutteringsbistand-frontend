import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import {
  filtrerbareInnsatsgrupper, FiltrerbarInnsatsgruppe,
  Innsatsgruppe,
} from '@/app/kandidat/_ui/innsatsgrupper';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

export enum OmfangValg {
  HELTID = 'HELTID',
  DELTID = 'DELTID',
  HELTID_ELLER_DELTID = 'HELTID_ELLER_DELTID',
}

export const filtrerbareOmfang = {
  [OmfangValg.HELTID]: {
    label: 'Heltid',
    description: null,
  },
  [OmfangValg.DELTID]: {
    label: 'Deltid',
    description: null,
  },
  [OmfangValg.HELTID_ELLER_DELTID]: {
    label: 'Heltid eller deltid',
    description: null,
  },
};

const Omfang = () => {
  const { omfang, setOmfang } = useKandidatSøkFilterContext();

  const onChange = (valgtOmfang: OmfangValg[]) => {
    setOmfang(valgtOmfang);
  };

  return (
    <CheckboxGroup
      size='small'
      legend='Ønsket omfang'
      onChange={onChange}
      value={Array.from(omfang)}
    >
      {Object.entries(filtrerbareOmfang).map(([kode, gruppe]) => (
        <Checkbox key={kode} value={kode}>
          {gruppe.label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};

export default Omfang;
