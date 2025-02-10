'use client';
import 'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/index.css';
import dynamic from 'next/dynamic';
import { getMiljø, Miljø } from '../../../../../util/miljø';
import { useApplikasjonContext } from '../../../../ApplikasjonContext';
import { DecoratorProps } from './Interndekoratør';

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
  const { setValgtNavKontor, setValgtFnr, valgtFnr } = useApplikasjonContext();

  return (
    <Decorator
      fnr={valgtFnr ?? undefined}
      fnrSyncMode={'writeOnly'}
      appName='Rekrutteringsbistand'
      environment={miljo}
      proxy={proxyUrl}
      showEnheter
      showHotkeys={false}
      showSearchArea={false}
      fetchActiveEnhetOnMount
      urlFormat='NAV_NO'
      onFnrChanged={(fnr) => {
        setValgtFnr(fnr ?? null);
      }}
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
