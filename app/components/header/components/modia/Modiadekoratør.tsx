'use client';
import { Suspense, useEffect, useState } from 'react';
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

const miljo = getMiljø() === Miljø.ProdGcp ? 'prod' : 'q0';

const Modiadekoratør: React.FC = () => {
  const { setValgtNavKontor } = useApplikasjonContext();
  const [Decorator, setDecorator] =
    useState<React.ComponentType<DecoratorProps> | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@navikt/navspa')
        .then((NAVSPA) => {
          const InternflateDecorator = NAVSPA.default.importer<DecoratorProps>(
            'internarbeidsflate-decorator-v3',
          );
          setDecorator(() => InternflateDecorator);
        })
        .catch((err) => {
          console.error('Failed to load decorator:', err);
          setError(true);
        });
    }
  }, []);

  if (error) {
    return <div>Kunne ikke laste dekoratør. Vennligst prøv igjen senere.</div>;
  }

  if (!Decorator) {
    return <div>Laster dekoratør...</div>;
  }

  return (
    <Suspense fallback={<div>Laster dekoratør...</div>}>
      <Decorator
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
