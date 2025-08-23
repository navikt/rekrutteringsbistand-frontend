import navkontorer from './enheter.json';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
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

  // Sjekk om vi er på en stilling side (/stilling/{id})
  const isStillingSide = pathname.match(/^\/stilling\/[^\/]+$/);

  return (
    <div className='flex items-center ml-4'>
      Utvikler navkontor:
      <Select
        onChange={(val: React.ChangeEvent<HTMLSelectElement>) => {
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
      {isStillingSide && (
        <Button variant='tertiary' onClick={handleUtviklerClick}>
          Rediger stilling
        </Button>
      )}
    </div>
  );
};

export default UtviklerDekoratør;
