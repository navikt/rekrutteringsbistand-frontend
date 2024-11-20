'use client';
import dynamic from 'next/dynamic';
import { FunctionComponent, Suspense, useEffect, useState } from 'react';
import { getMiljø, Miljø } from '../../../../../util/miljø';
import { useApplikasjonContext } from '../../../../ApplikasjonContext';
import { DecoratorProps } from './Interndekoratør';

const proxyUrl =
  getMiljø() === Miljø.ProdGcp
    ? 'https://rekrutteringsbistand-frontend.intern.nav.no'
    : 'https://rekrutteringsbistand-frontend.intern.dev.nav.no';

let NAVSPA: {
  importer<T>(name: string): React.ComponentType<T>;
};
if (typeof window !== 'undefined') {
  NAVSPA = require('@navikt/navspa');
}

const DynamicDecorator = dynamic(
  async () => {
    if (!NAVSPA) {
      throw new Error('NAVSPA is not available on the server.');
    }
    const InternflateDecorator = NAVSPA.importer<DecoratorProps>(
      'internarbeidsflate-decorator-v3',
    );
    console.log('🎺 Decorator loaded:', InternflateDecorator);
    return InternflateDecorator;
  },
  { ssr: false },
);

const miljo = getMiljø() === Miljø.ProdGcp ? 'prod' : 'q0';

const Modiadekoratør: FunctionComponent = () => {
  const { setValgtNavKontor } = useApplikasjonContext();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!NAVSPA) {
      setHasError(true);
    }
  }, []);

  if (hasError) {
    return <div>Klarte ikke å laste inn Modia dekoratør</div>;
  }

  return (
    <Suspense fallback={<div>Laster dekoratør...</div>}>
      <DynamicDecorator
        useProxy
        appName={'Rekrutteringsbistand'}
        environment={miljo}
        proxy={proxyUrl}
        showEnheter={true}
        showHotkeys={false}
        showSearchArea={false}
        fetchActiveEnhetOnMount={true}
        urlFormat={'NAV_NO'}
        onEnhetChanged={(_, enhet) => {
          setValgtNavKontor({
            navKontor: enhet?.enhetId ?? 'Ukjent navkontor ID',
            navKontorNavn: enhet?.navn ?? 'Ukjent navkontor NAVN',
          });
        }}
      />
    </Suspense>
  );
};

export default Modiadekoratør;
