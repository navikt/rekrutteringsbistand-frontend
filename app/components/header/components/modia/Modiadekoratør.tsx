'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { getMiljø, Miljø } from '../../../../../util/miljø';
import { useApplikasjonContext } from '../../../../ApplikasjonContext';
import { DecoratorProps } from './Interndekoratør';

const proxyUrl =
  getMiljø() === Miljø.ProdGcp
    ? 'https://rekrutteringsbistand-frontend.intern.nav.no'
    : 'https://rekrutteringsbistand-frontend.intern.dev.nav.no';

const miljo = getMiljø() === Miljø.ProdGcp ? 'prod' : 'q0';

const InternflateDecorator = dynamic(
  () =>
    import('@navikt/navspa').then((NAVSPA) => {
      return NAVSPA.default.importer<DecoratorProps>(
        'internarbeidsflate-decorator-v3',
      );
    }),
  { ssr: false },
);

const Modiadekoratør: React.FC = () => {
  const { setValgtNavKontor } = useApplikasjonContext();

  if (!InternflateDecorator) {
    return <div>Laster dekoratør...</div>;
  }

  return (
    <Suspense fallback={<div>Laster dekoratør...</div>}>
      <InternflateDecorator
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
