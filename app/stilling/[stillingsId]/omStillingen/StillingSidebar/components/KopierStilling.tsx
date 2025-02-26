import { FilesIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import * as React from 'react';
import { kopierStilling } from '../../../../../api/stilling/rekrutteringsbistandstilling/kopier/[slug]/kopierStilling';
import { useVisVarsling } from '../../../../../components/varsling/Varsling';
export interface KopierStillingProps {
  stillingsId: string;
}

const KopierStilling: React.FC<KopierStillingProps> = ({ stillingsId }) => {
  const [loading, setLoading] = React.useState(false);
  const varsel = useVisVarsling();
  const onKopierStilling = async () => {
    try {
      setLoading(true);
      await kopierStilling(stillingsId);

      varsel({
        innhold: 'Stilling dupliserte',
        alertType: 'success',
      });
    } catch (error) {
      logger.error('Feil ved duplisering av stilling', error);
      varsel({
        innhold: 'Feil ved duplisering av stilling',
        alertType: 'error',
      });
    } finally {
      setLoading(false);
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
