import { LocalAlert } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  tittelnivå?: 'h3' | 'h4';
}

const Feilvarsel: FC<Props> = ({ children, tittelnivå = 'h4' }) => (
  <LocalAlert as='div' status='error'>
    <LocalAlert.Header>
      <LocalAlert.Title as={tittelnivå}>{children}</LocalAlert.Title>
    </LocalAlert.Header>
  </LocalAlert>
);

export default Feilvarsel;
