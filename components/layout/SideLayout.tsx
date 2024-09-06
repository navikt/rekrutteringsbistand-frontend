import { Accordion, Hide, Show } from '@navikt/ds-react';
import * as React from 'react';

// import { TilToppenKnapp } from "../tilToppenKnapp/TilToppenKnapp";

export type ISideLayout = {
  children: React.ReactNode | undefined;
  banner?: React.ReactNode;
  sidepanel?: React.ReactNode | undefined;
};

const SideLayout = ({
  banner,
  sidepanel,

  children,
}: ISideLayout) => {
  return (
    <div className='w-full flex justify-center mx-auto'>
      <div className='w-full '>
        <div className='mb-8'>{banner && banner}</div>
        <div className=' flex flex-col gap-y-8 gap-x-[3.5rem] md:flex-row'>
          {sidepanel && (
            <aside className='sidebar flex-grow-0 w-full md:w-[22.5rem]'>
              <Show above='md'>{sidepanel}</Show>
              <Hide above='md'>
                <Accordion>
                  <Accordion.Item>
                    <Accordion.Header>Filtrer</Accordion.Header>
                    <Accordion.Content>{sidepanel}</Accordion.Content>
                  </Accordion.Item>
                </Accordion>
              </Hide>
            </aside>
          )}
          <main className='sideinnhold w-full'>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default SideLayout;
