import NAVSPA from '@navikt/navspa';
import { FunctionComponent } from 'react';
import { DecoratorProps, Enhet } from './Interndekoratør';

const InternflateDecorator = NAVSPA.importer<DecoratorProps>(
  'internarbeidsflate-decorator-v3'
);

const Modiadekoratør: FunctionComponent = async () => {
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
      urlFormat={'NAV_NO'}
    />
  );
};

export default Modiadekoratør;
