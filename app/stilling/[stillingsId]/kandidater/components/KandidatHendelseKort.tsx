import { BodyShort, Box } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

export interface KandidatHendelseKortProps {
  tittel: string;
  tekst: string;
  dato?: Date;
  fargeKode: string;
  ikon: React.ReactNode;
}

const KandidatHendelseKort: React.FC<KandidatHendelseKortProps> = ({
  tittel,
  tekst,
  dato,
  fargeKode,
  ikon,
}) => {
  const backgroundColor =
    fargeKode === 'error'
      ? 'danger-softA'
      : fargeKode === 'success'
        ? 'success-softA'
        : 'info-softA';

  return (
    <Box.New
      background={backgroundColor}
      borderRadius='xlarge'
      paddingInline='space-16'
      paddingBlock='space-12'
    >
      <div className='flex items-start justify-between'>
        <div className='flex gap-2'>
          <div className='mt-0.5'>{ikon}</div>
          <div>
            <BodyShort weight='semibold'>{tittel}</BodyShort>
            {tekst && (
              <BodyShort size='small' textColor='subtle'>
                {tekst}{' '}
                {dato && format(dato, 'dd. MMMM yyyy HH:mm', { locale: nb })}
              </BodyShort>
            )}
          </div>
        </div>
      </div>
    </Box.New>
  );
};

export default KandidatHendelseKort;
