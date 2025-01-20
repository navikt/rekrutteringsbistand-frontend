import { FilesIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';
import { kopierStilling } from '../../../../../api/stilling/rekrutteringsbistandstilling/[slug]/kopier/[slug]/kopierStilling';
import { useVisVarsling } from '../../../../../components/varsling/Varsling';
export interface KopierStillingProps {
  stillingsId: string;
}

const KopierStilling: React.FC<KopierStillingProps> = ({ stillingsId }) => {
  const [loading, setLoading] = React.useState(false);
  const varsel = useVisVarsling();
  const onKopierStilling = async () => {
    setLoading(true);
    const response = await kopierStilling(stillingsId);

    if (response.status === 200) {
      varsel({
        innhold: 'Stilling dupliserte',
        alertType: 'success',
      });
    } else {
      varsel({
        innhold: 'Feil ved duplisering av stilling',
        alertType: 'error',
      });
    }
  };

  return (
    <Button
      icon={<FilesIcon />}
      variant='secondary'
      size='small'
      loading={loading}
      onClick={onKopierStilling}
    >
      Dupliser
    </Button>
  );
};

export default KopierStilling;
