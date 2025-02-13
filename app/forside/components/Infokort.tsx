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
      background='raised'
      borderColor='neutral-subtleA'
      borderRadius='xlarge'
      borderWidth='1'
      padding='6'
    >
      <div className='flex flex-col'>
        <div className='flex justify-between items-start pb-2'>
          <div className='flex flex-col'>
            <Detail className='text-[var(--ax-text-subtle)]'>
              {beskrivelse}
            </Detail>
            <span className='text-[var(--ax-text-default)] text-[40px] font-semibold leading-[52px]'>
              {tall}
            </span>
          </div>
          {ikon && (
            <Box
              background='surface-action-subtle'
              padding='2'
              borderRadius='full'
              className='flex justify-center items-center'
            >
              <div className='w-6 h-6 relative text-2xl text-[var(--a-gray-900)]'>
                {ikon}
              </div>
            </Box>
          )}
        </div>
        <div className='flex flex-col'>
          {detaljer?.map((d, index) => (
            <Box.New
              key={index}
              className='flex justify-between items-start gap-3'
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
