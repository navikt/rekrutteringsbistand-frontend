import { OpprettStillingProps } from '@/app/api/stilling/ny-stilling/opprettNyStilling';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import OpprettInfoDialog from '@/components/opprett/OpprettInfoDialog';
import { opprettOgNaviger } from '@/components/opprett/opprett-ny';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { Button } from '@navikt/ds-react';
import { FC, useState } from 'react';

export const OpprettKnapp: FC<{ kategori: Stillingskategori }> = ({
  kategori,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { valgtNavKontor, brukerData } = useApplikasjonContext();
  const { trackAndNavigate } = useUmami();
  const [visInfo, setVisInfo] = useState(false);
  const harInfo = kategori === Stillingskategori.Stilling;

  const opprett = async () => {
    setLoading(true);
    const opprettProps: OpprettStillingProps = {
      kategori,
      eierNavKontorEnhetId: valgtNavKontor?.navKontor,
      navident: brukerData.ident,
      brukerNavn: `${brukerData.fornavn} ${brukerData.etternavn}`,
    };
    try {
      await opprettOgNaviger(opprettProps, trackAndNavigate);
    } finally {
      setLoading(false);
    }
  };

  const knappTekst = () => {
    switch (kategori) {
      case Stillingskategori.Stilling:
        return 'Opprett stillingsoppdrag';
      case Stillingskategori.Formidling:
        return 'Opprett etterregistrering';
      default:
        return 'Opprett';
    }
  };

  return (
    <>
      <Button
        size='small'
        loading={loading}
        onClick={() => (harInfo ? setVisInfo(true) : opprett())}
      >
        {knappTekst()}
      </Button>
      {harInfo && (
        <OpprettInfoDialog
          type='stillingsoppdrag'
          åpen={visInfo}
          onBekreft={opprett}
          onLukk={() => setVisInfo(false)}
        />
      )}
    </>
  );
};
