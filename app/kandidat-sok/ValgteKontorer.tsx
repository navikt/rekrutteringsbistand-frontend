import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { Button, Popover, Tabs, UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import { Portefølje } from './components/PorteføljeTabs';

export interface ValgteKontorerProps {
  children?: React.ReactNode | undefined;
}

const ValgteKontorer: React.FC<ValgteKontorerProps> = ({ children }) => {
  const [visKontorvelger, setVisKontorvelger] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  return (
    // <Dropdown>
    <>
      <Tabs.Tab
        value={Portefølje.VALGTE_KONTORER}
        label='Valgte kontorer'
        icon={
          <Button
            ref={buttonRef}
            className='p-0'
            onClick={() => setVisKontorvelger(!visKontorvelger)}
            variant='tertiary'
            role='button'
          >
            {visKontorvelger ? (
              <ChevronUpIcon title='Lukk kontorvelger' />
            ) : (
              <ChevronDownIcon title='Velg andre kontor' />
            )}
          </Button>
        }
      />
      <Popover
        placement='bottom'
        open={visKontorvelger}
        onClose={() => setVisKontorvelger(false)}
        anchorEl={buttonRef.current}
      >
        <Popover.Content>
          <div>
            <UNSAFE_Combobox label='Søk etter kontor' options={[]} />
          </div>
        </Popover.Content>
      </Popover>
    </>
    //   <Dropdown.Menu placement='right'>
    //     <Dropdown.Menu.GroupedList>
    //       <Dropdown.Menu.GroupedList.Heading>
    //         Velg kontor
    //       </Dropdown.Menu.GroupedList.Heading>
    //     </Dropdown.Menu.GroupedList>
    //     <UNSAFE_Combobox label='Søk etter kontor' options={[]} />
    //   </Dropdown.Menu>
    // </Dropdown>
  );
};

export default ValgteKontorer;
