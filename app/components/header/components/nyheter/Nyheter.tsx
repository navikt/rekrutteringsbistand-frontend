import { LightBulbIcon } from '@navikt/aksel-icons';
import { Button, Heading, Popover } from '@navikt/ds-react';
import {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import Artikkel from './Artikkel';
import css from './Nyheter.module.css';
import nyhetssaker from './nyhetssaker';
import useAntallUlesteNyheter from './useAntallUlesteNyheter';

export type Nyhet = {
  dato: Date;
  tittel: string;
  innhold: ReactNode;
};

const Nyheter: FunctionComponent = () => {
  const [åpen, setÅpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // const { darkMode, setDarkMode } = useApplikasjonContext();

  const onFørsteBesøk = () => {
    setÅpen(true);
  };

  const [antallUlesteNyheter, antallUlesteVedSidelast, markerSomLest] =
    useAntallUlesteNyheter(nyhetssaker, onFørsteBesøk);

  useEffect(() => {
    if (åpen) {
      markerSomLest();
    }
  }, [åpen, markerSomLest]);

  return (
    <div className={css.nyheter}>
      <div className='flex'>
        {/* <Switch
          disabled
          size='small'
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
        >
          Mørk modus
        </Switch> */}
        <Button
          ref={buttonRef}
          className={css.knapp}
          icon={<LightBulbIcon aria-hidden />}
          size='small'
          variant='tertiary-neutral'
          onClick={() => setÅpen(!åpen)}
        >
          Hva er nytt
          {antallUlesteNyheter > 0 && <div className={css.notifikasjon} />}
        </Button>
      </div>
      <Popover
        anchorEl={buttonRef.current}
        open={åpen}
        placement='bottom-end'
        onClose={() => setÅpen(false)}
      >
        <div className={css.popover}>
          <Heading className={css.tittel} level='2' size='xsmall'>
            Nytt i Rekrutteringsbistand
          </Heading>
          <section className={css.nyhetsliste}>
            {nyhetssaker.map((nyhet, index) => (
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
