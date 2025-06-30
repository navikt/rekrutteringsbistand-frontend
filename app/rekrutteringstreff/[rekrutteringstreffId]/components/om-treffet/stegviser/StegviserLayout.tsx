'use client';

import * as React from 'react';

interface Props {
  header: React.ReactElement<{ isOpen?: boolean; toggle?: () => void }>;
  children: React.ReactNode;
}

// Komponent for å kunne ha en enkel dropdown med content som tilfredsstiller designet.
// Aksel Accordion og Expansioncard kan ikke ha inn ekstra elementer som knapper i headeren
const StegviserLayout: React.FC<Props> = ({ header, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen((o) => !o);

  const headerWithProps = React.cloneElement(header, {
    isOpen,
    toggle,
  });

  return (
    <div className='my-2'>
      {headerWithProps}
      {isOpen && children}
    </div>
  );
};

export default StegviserLayout;
