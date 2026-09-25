import { LocalAlert } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Feilvarsel: FC<Props> = ({ children }) => (
  <LocalAlert as='div' status='error'>
    <LocalAlert.Content>{children}</LocalAlert.Content>
  </LocalAlert>
);

export default Feilvarsel;
