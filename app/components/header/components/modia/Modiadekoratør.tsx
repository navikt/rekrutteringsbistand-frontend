'use client';
import dynamic from 'next/dynamic';
import { getMiljø, Miljø } from '../../../../../util/miljø';
import { useApplikasjonContext } from '../../../../ApplikasjonContext';

interface Enhet {
  enhetId: string;
  navn: string;
}

interface DecoratorProps {
  useProxy: boolean;
  appName: string;
  environment: string;
  proxy: string;
  showEnheter: boolean;
  showHotkeys: boolean;
  showSearchArea: boolean;
  fetchActiveEnhetOnMount: boolean;
  urlFormat: string;
  onEnhetChanged: (oldEnhet: Enhet | null, newEnhet: Enhet | null) => void;
}

const proxyUrl =
  getMiljø() === Miljø.ProdGcp
    ? 'https://rekrutteringsbistand-frontend.intern.nav.no'
    : 'https://rekrutteringsbistand-frontend.intern.dev.nav.no';

const miljo = getMiljø() === Miljø.ProdGcp ? 'prod' : 'q0';

const Decorator = dynamic<DecoratorProps>(
  () =>
    import('@navikt/navspa').then((NAVSPA) =>
      NAVSPA.default.importer<DecoratorProps>(
        'internarbeidsflate-decorator-v3',
      ),
    ),
  {
    ssr: false,
    loading: () => <div>Laster dekoratør...</div>,
  },
);

const Modiadekoratør: React.FC = () => {
  const { setValgtNavKontor } = useApplikasjonContext();

  return (
    <Decorator
      useProxy
      appName='Rekrutteringsbistand'
      environment={miljo}
      proxy={proxyUrl}
      showEnheter
      showHotkeys={false}
      showSearchArea={false}
      fetchActiveEnhetOnMount
      urlFormat='NAV_NO'
      onEnhetChanged={(_, enhet) => {
        setValgtNavKontor({
          navKontor: enhet?.enhetId ?? 'Ukjent navkontor ID',
          navKontorNavn: enhet?.navn ?? 'Ukjent navkontor NAVN',
        });
      }}
    />
  );
};

export default Modiadekoratør;
