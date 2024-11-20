'use client';

import { FunctionComponent, Suspense, useEffect, useState } from 'react';
import { getMiljø, Miljø } from '../../../../../util/miljø';
import { useApplikasjonContext } from '../../../../ApplikasjonContext';
import { DecoratorProps } from './Interndekoratør';

const getDecorator = async () => {
  try {
    const navspa = await import('@navikt/navspa');
    return navspa.default.importer<DecoratorProps>(
      'internarbeidsflate-decorator-v3',
    );
  } catch (error) {
    console.error('Failed to import decorator:', error);
    throw error;
  }
};

const miljo = getMiljø() === Miljø.ProdGcp ? 'prod' : 'q0';

const Modiadekoratør: FunctionComponent = () => {
  const { setValgtNavKontor } = useApplikasjonContext();
  const [Decorator, setDecorator] =
    useState<React.ComponentType<DecoratorProps> | null>(null);

  useEffect(() => {
    const loadDecorator = async () => {
      try {
        const InternflateDecorator = await getDecorator();
        setDecorator(() => InternflateDecorator);
      } catch (error) {
        console.error('Error loading decorator:', error);
      }
    };
    loadDecorator();
  }, []);

  if (!Decorator) {
    return <div>Laster dekoratør...</div>;
  }

  return (
    <Suspense fallback={<div>Laster dekoratør...</div>}>
      <Decorator
        useProxy
        appName={'Rekrutteringsbistand'}
        environment={miljo}
        proxy={process.env.NEXT_PUBLIC_BASE_URL}
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
