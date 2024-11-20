'use client';
import NAVSPA from '@navikt/navspa';
import { FunctionComponent, useEffect, useState } from 'react';
import { getMiljø, Miljø } from '../../../../../util/miljø';
import { useApplikasjonContext } from '../../../../ApplikasjonContext';
import { DecoratorProps, Enhet } from './Interndekoratør';

const getDecorator = () => {
  try {
    return NAVSPA.importer<DecoratorProps>('internarbeidsflate-decorator-v3');
  } catch (error) {
    console.error('Klarte ikke å importere dekoratør:', error);
    return null;
  }
};

const proxyUrl =
  getMiljø() === Miljø.ProdGcp
    ? 'https://rekrutteringsbistand-frontend.intern.nav.no'
    : 'https://rekrutteringsbistand-frontend.intern.dev.nav.no';

const miljo = getMiljø() === Miljø.ProdGcp ? 'prod' : 'q0';

const Modiadekoratør: FunctionComponent = () => {
  const { setValgtNavKontor } = useApplikasjonContext();
  const [Decorator, setDecorator] = useState<any>(null);

  useEffect(() => {
    const InternflateDecorator = getDecorator();
    setDecorator(InternflateDecorator);
  }, []);

  if (!Decorator) {
    return <div>Loading decorator...</div>;
  }

  return (
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
      onEnhetChanged={(_: string | null, enhet?: Enhet): void => {
        setValgtNavKontor({
          navKontor: enhet?.enhetId ?? 'Ukjent navkontor ID',
          navKontorNavn: enhet?.navn ?? 'Ukjent navkontor NAVN',
        });
      }}
    />
  );
};

export default Modiadekoratør;
