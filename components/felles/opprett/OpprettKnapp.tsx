import { OpprettStillingProps } from '@/app/api/stilling/ny-stilling/opprettNyStilling';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { opprettOgNaviger } from '@/components/felles/opprett/opprett-ny';
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

  const opprett = async () => {
    setLoading(true);
    const opprettProps: OpprettStillingProps = {
      kategori,
      eierNavKontorEnhetId: valgtNavKontor?.navKontor,
      navident: brukerData.ident,
      brukerNavn: `${brukerData.fornavn} ${brukerData.etternavn}`,
    };
    await opprettOgNaviger(opprettProps, trackAndNavigate);
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
    <Button size='small' loading={loading} onClick={opprett}>
      {knappTekst()}
    </Button>
  );
};
