'use client';

import { Accordion, Hide, Show } from '@navikt/ds-react';
import * as React from 'react';

// import { TilToppenKnapp } from "../tilToppenKnapp/TilToppenKnapp";

export type ISideLayout = {
  children: React.ReactNode;
  banner?: React.ReactNode;
  sidepanel?: React.ReactNode;
};

const SideLayout = ({ banner, sidepanel, children }: ISideLayout) => {
  return (
    <div className='mx-auto flex w-full justify-center'>
      <div className='w-full'>
        <div className='mb-8'>{banner && banner}</div>
        <div className='flex flex-col gap-x-[3.5rem] gap-y-8 md:flex-row'>
          {sidepanel && (
            <aside className='sidebar w-full flex-grow-0 md:w-[22.5rem]'>
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
          <div className='sideinnhold w-full'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SideLayout;
