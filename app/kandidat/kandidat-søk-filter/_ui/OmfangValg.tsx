import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

export enum OmfangValg {
  HELTID = 'HELTID',
  DELTID = 'DELTID',
}

export const filtrerbareOmfang = {
  [OmfangValg.HELTID]: 'Heltid',
  [OmfangValg.DELTID]: 'Deltid',
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
      value={omfang}
    >
      {Object.entries(filtrerbareOmfang).map(([kode, gruppe]) => (
        <Checkbox key={kode} value={kode}>
          {gruppe}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};

export default Omfang;
