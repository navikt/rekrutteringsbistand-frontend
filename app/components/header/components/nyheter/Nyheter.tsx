import { nyheter } from '../../../../nyheter';
import { useThemeProvider } from '../../../../providers/ThemeProvider';
import Artikkel from './Artikkel';
import useAntallUlesteNyheter from './useAntallUlesteNyheter';
import { LightBulbIcon } from '@navikt/aksel-icons';
import { Button, Heading, Popover, Switch } from '@navikt/ds-react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

const Nyheter: FunctionComponent = () => {
  const [åpen, setÅpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { darkMode, setDarkMode } = useThemeProvider();

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
    <div className='[&_.navds-popover]:rounded-[0.6rem] [&_.navds-popover]:border-none [&_.navds-popover]:shadow-none [&_.navds-popover__arrow]:border-none [&_.navds-popover__arrow]:bg-[var(--a-gray-800)] [&_.navds-popover:focus]:shadow-[var(--nav-fokus)]'>
      <div className='flex'>
        <Switch
          className='mr-2'
          size='small'
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
        >
          Mørk modus
        </Switch>
        <Button
          ref={buttonRef}
          className='relative focus:shadow-[var(--nav-fokus)] focus:outline-none'
          icon={<LightBulbIcon aria-hidden />}
          size='small'
          variant='tertiary-neutral'
          onClick={() => setÅpen(!åpen)}
        >
          Hva er nytt
          {antallUlesteNyheter > 0 && (
            <div className='absolute top-1 right-0 h-3 w-3 rounded-full bg-[#0067c5]' />
          )}
        </Button>
      </div>
      <Popover
        anchorEl={buttonRef.current}
        open={åpen}
        placement='bottom-end'
        onClose={() => setÅpen(false)}
      >
        <div className='w-[27rem] overflow-hidden rounded-lg shadow-[0_0.25rem_0.25rem_0_rgba(62,56,50,0.125)]'>
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
