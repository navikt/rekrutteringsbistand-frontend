'use client';

import dynamic from 'next/dist/shared/lib/dynamic';
import { FunctionComponent, Suspense } from 'react';
import { getMiljø, Miljø } from '../../../../../util/miljø';
import { useApplikasjonContext } from '../../../../ApplikasjonContext';
import { DecoratorProps } from './Interndekoratør';

const DynamicDecorator = dynamic(
  async () => {
    const NAVSPA = await import('@navikt/navspa');
    return NAVSPA.default.importer<DecoratorProps>(
      'internarbeidsflate-decorator-v3',
    );
  },
  { ssr: false },
);

const miljo = getMiljø() === Miljø.ProdGcp ? 'prod' : 'q0';

const Modiadekoratør: FunctionComponent = () => {
  const { setValgtNavKontor } = useApplikasjonContext();

  return (
    <Suspense fallback={<div>Laster dekoratør...</div>}>
      <DynamicDecorator
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
