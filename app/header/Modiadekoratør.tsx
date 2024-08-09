import { InternalHeader, Spacer } from '@navikt/ds-react';
import NAVSPA from '@navikt/navspa';
import { FunctionComponent } from 'react';
import { isLocal } from '../util/env';
import { DecoratorProps, Enhet } from './Interndekoratør';

const InternflateDecorator = NAVSPA.importer<DecoratorProps>(
  'internarbeidsflate-decorator-v3'
);

const Modiadekoratør: FunctionComponent = () => {
  if (isLocal) {
    return (
      <InternalHeader>
        <InternalHeader.Title as='h1'>
          Rekrutteringsbistand - DEV
        </InternalHeader.Title>
        <Spacer />
        <InternalHeader.User name='Developer' />
      </InternalHeader>
    );
  }
  return (
    <InternflateDecorator
      useProxy
      proxy='https://rekrutteringsbistand-next.intern.dev.nav.no'
      onEnhetChanged={function (enhetId?: string | null, enhet?: Enhet): void {
        console.log('Function not implemented.');
      }}
      appName={'Rekrutteringsbistand'}
      showEnheter={true}
      showSearchArea={false}
      showHotkeys={false}
      environment={'q0'}
      urlFormat={'ANSATT'}
    />
  );
};

export default Modiadekoratør;
