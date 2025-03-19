import { Box, Detail, Skeleton } from '@navikt/ds-react';
import * as React from 'react';

export interface IInfokort {
  beskrivelse: string;
  ikon?: React.ReactElement;
  tall: number;
  detaljer?: Array<{
    beskrivelse: string;
    tall: number;
  }>;
}

export const InfokortSkeleton = () => {
  return <Skeleton height={150} variant='rounded' width='50%' />;
};

const Infokort: React.FC<IInfokort> = ({
  beskrivelse,
  ikon,
  tall,
  detaljer,
}) => {
  return (
    <Box.New
      background={'neutral-softA'}
      borderColor='neutral-subtleA'
      borderRadius='xlarge'
      borderWidth='1'
      padding='6'
    >
      <div className='flex flex-col'>
        <div className='flex items-start justify-between pb-2'>
          <div className='flex flex-col'>
            <Detail className='text-[var(--ax-text-subtle)]'>
              {beskrivelse}
            </Detail>
            <span className='text-[40px] leading-[52px] font-semibold text-[var(--ax-text-default)]'>
              {tall}
            </span>
          </div>
          {ikon && (
            <Box.New
              padding='2'
              borderRadius='full'
              className='flex items-center justify-center'
            >
              <div className='relative h-6 w-6 text-2xl '>{ikon}</div>
            </Box.New>
          )}
        </div>
        <div className='flex flex-col'>
          {detaljer?.map((d, index) => (
            <Box.New
              key={index}
              className='flex items-start justify-between gap-3'
            >
              <span className='text-[var(--ax-text-default)]'>
                {d.beskrivelse}
              </span>
              <span className='font-semibold text-[var(--ax-text-default)]'>
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
