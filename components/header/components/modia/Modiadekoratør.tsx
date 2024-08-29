import NAVSPA from '@navikt/navspa';
import React, { FunctionComponent } from 'react';
import { ApplikasjonContext } from '../../../../app/ApplikasjonContext';
import { DecoratorProps, Enhet } from './Interndekoratør';

const InternflateDecorator = NAVSPA.importer<DecoratorProps>(
  'internarbeidsflate-decorator-v3',
);

const Modiadekoratør: FunctionComponent = async () => {
  const { setValgtNavKontor } = React.useContext(ApplikasjonContext);
  return (
    <InternflateDecorator
      useProxy
      appName={'Rekrutteringsbistand'}
      environment={'q0'}
      proxy='https://rekrutteringsbistand-next.intern.dev.nav.no'
      showEnheter={true}
      showHotkeys={false}
      showSearchArea={false}
      urlFormat={'NAV_NO'}
      onEnhetChanged={function (enhetId?: string | null, enhet?: Enhet): void {
        setValgtNavKontor({
          navKontor: enhet?.enhetId ?? 'Ukjent navkontor ID',
          navKontorNavn: enhet?.navn ?? 'Ukjent navkontor NAVN',
        });
      }}
    />
  );
};

export default Modiadekoratør;
