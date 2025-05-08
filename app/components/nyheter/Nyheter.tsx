import { useSidebar } from '../../../components/ui/sidebar';
import { nyheter } from '../../nyheter';
import Artikkel from './Artikkel';
import useAntallUlesteNyheter from './useAntallUlesteNyheter';
import { MegaphoneIcon } from '@navikt/aksel-icons';
import { Button, Heading, Popover } from '@navikt/ds-react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

const Nyheter: FunctionComponent = () => {
  const [åpen, setÅpen] = useState<boolean>(false);
  const { open } = useSidebar();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onFørsteBesøk = () => {
    setÅpen(true);
  };

  const [antallUlesteNyheter, antallUlesteVedSidelast, markerSomLest] =
    useAntallUlesteNyheter(nyheter, onFørsteBesøk);

  useEffect(() => {
    if (åpen) {
      markerSomLest();
    }
  }, [åpen, markerSomLest]);

  return (
    <div className='w-full'>
      <Button
        ref={buttonRef}
        icon={<MegaphoneIcon aria-hidden />}
        variant='tertiary-neutral'
        onClick={() => setÅpen(!åpen)}
        className='w-full text-left justify-start'
      >
        {open && (
          <div className='whitespace-nowrap flex'>
            Nyheter
            {antallUlesteNyheter > 0 && (
              <div className='ml-2 right-0 h-3 w-3 rounded-full bg-[#0067c5]' />
            )}
          </div>
        )}
      </Button>

      <Popover
        anchorEl={buttonRef.current}
        open={åpen}
        onClose={() => setÅpen(false)}
      >
        <div className='w-[27rem] max-w-[90vw] overflow-hidden rounded-lg shadow-[0_0.25rem_0.25rem_0_rgba(62,56,50,0.125)]'>
          <Heading className='p-4 px-6 text-center' level='2' size='xsmall'>
            Nytt i Rekrutteringsbistand
          </Heading>
          <hr />
          <section className='max-h-[30rem] overflow-y-auto'>
            {nyheter.map((nyhet, index) => (
              <Artikkel
                key={`${nyhet.dato}-${nyhet.tittel}`}
                nyhet={nyhet}
                ulest={index < antallUlesteVedSidelast}
              />
            ))}
          </section>
        </div>
      </Popover>
    </div>
  );
};

export default Nyheter;
