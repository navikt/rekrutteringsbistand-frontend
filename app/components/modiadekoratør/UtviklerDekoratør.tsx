import { useApplikasjonContext } from '../../providers/ApplikasjonContext';
import navkontorer from './enheter.json';
import { Button, Select } from '@navikt/ds-react';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

const UtviklerDekoratør: React.FC = () => {
  const { valgtNavKontor, setValgtNavKontor } = useApplikasjonContext();
  const router = useRouter();
  const pathname = usePathname();
  const handleUtviklerClick = () => {
    const utviklerPath = `${pathname}/utvikler`;
    router.push(utviklerPath);
  };

  return (
    <div className='flex items-center'>
      Utvikler navkontor:
      <Select
        onChange={(val) => {
          const selectedKontor = navkontorer.find(
            (kontor) => kontor.enhetId === val.target.value,
          );
          setValgtNavKontor({
            navKontor: val.target.value,
            navKontorNavn: selectedKontor?.navn || '',
          });
        }}
        value={valgtNavKontor?.navKontor}
        hideLabel
        label='Velg navkontor (Utvikler)'
        size='small'
      >
        {navkontorer.map((kontor) => {
          return (
            <option value={kontor.enhetId} key={kontor.enhetId}>
              {kontor.navn}
            </option>
          );
        })}
      </Select>
      <Button variant='tertiary' onClick={handleUtviklerClick}>
        Rediger stilling
      </Button>
    </div>
  );
};

export default UtviklerDekoratør;
