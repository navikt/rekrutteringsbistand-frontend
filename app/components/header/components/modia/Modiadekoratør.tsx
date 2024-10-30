import NAVSPA from '@navikt/navspa';
import { FunctionComponent } from 'react';
import { getMiljø, Miljø } from '../../../../../util/miljø';
import { useApplikasjonContext } from '../../../../ApplikasjonContext';
import { DecoratorProps, Enhet } from './Interndekoratør';

const InternflateDecorator = NAVSPA.importer<DecoratorProps>(
  'internarbeidsflate-decorator-v3',
);

const proxyUrl =
  getMiljø() === Miljø.ProdGcp
    ? 'https://rekrutteringsbistand-frontend.intern.nav.no'
    : 'https://rekrutteringsbistand-frontend.intern.dev.nav.no';

const miljo = getMiljø() === Miljø.ProdGcp ? 'prod' : 'q0';

const Modiadekoratør: FunctionComponent = async () => {
  const { setValgtNavKontor } = useApplikasjonContext();
  return (
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
