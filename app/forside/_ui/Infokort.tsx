import { BodyShort, Box, Skeleton } from '@navikt/ds-react';
import { FC, ReactElement } from 'react';

export interface IInfokort {
  tittel: string;
  beskrivelse?: string;
  ikon?: ReactElement;
  tall?: number;
  ikonFront?: boolean;
  detaljer?: Array<{
    beskrivelse: string;
    tall: number;
  }>;
}

export const InfokortSkeleton = ({ fullWidth }: { fullWidth?: boolean }) => {
  return (
    <Skeleton
      height={150}
      variant='rounded'
      width={fullWidth ? '100%' : '50%'}
    />
  );
};

const Infokort: FC<IInfokort> = ({
  tittel,
  beskrivelse,
  ikon,
  tall,
  detaljer,
  ikonFront,
}) => {
  const ikonVisning = <div className='relative h-6 w-6 text-2xl '>{ikon}</div>;

  return (
    <Box.New background='neutral-softA' borderRadius='xlarge' padding='6'>
      <div className='flex flex-col'>
        <div className='flex items-start justify-between pb-2'>
          <div className='flex flex-col'>
            <div className='flex items-center gap-4'>
              {ikon && ikonFront && ikonVisning}
              <BodyShort className='text-[var(--ax-text-neutral)]'>
                {tittel}
              </BodyShort>
            </div>
            {tall && (
              <span className='text-[40px] leading-[52px] font-semibold text-[var(--ax-text-neutral)]'>
                {tall}
              </span>
            )}
          </div>
          {ikon && !ikonFront && ikonVisning}
        </div>
        <div className='flex flex-col'>
          {beskrivelse && (
            <BodyShort className='text-[var(--ax-text-neutral)]'>
              {beskrivelse}
            </BodyShort>
          )}
          {detaljer?.map((d, index) => (
            <Box.New
              key={index}
              className='flex items-start justify-between gap-3 mt-2'
            >
              <span className='text-[var(--ax-text-neutral)]'>
                {d.beskrivelse}
              </span>
              <span className='font-semibold text-[var(--ax-text-neutral)]'>
                {d.tall}
              </span>
            </Box.New>
          ))}
        </div>
      </div>
    </Box.New>
  );
};

export default Infokort;
