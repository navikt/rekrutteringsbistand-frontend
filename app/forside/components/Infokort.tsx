import { Skeleton } from '@navikt/ds-react';
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
  return <Skeleton variant='rounded' width='50%' height={150} />;
};

const Infokort: React.FC<IInfokort> = ({
  beskrivelse,
  ikon,
  tall,
  detaljer,
}) => {
  return (
    <div className='bg-white rounded-lg border border-[#071936]/20 justify-start items-start inline-flex'>
      <div className='grow shrink basis-0 self-stretch p-6 flex-col justify-center items-start inline-flex'>
        <div className='self-stretch pb-2 justify-start items-start inline-flex'>
          <div className='grow shrink basis-0 flex-col justify-start items-start inline-flex'>
            <div className='self-stretch justify-start items-start gap-2 inline-flex'>
              <div className="grow shrink basis-0 text-[#010b18]/70 text-base font-semibold font-['Source Sans Pro'] leading-tight tracking-tight">
                {beskrivelse}
              </div>
            </div>
            <div className='self-stretch justify-start items-center gap-2 inline-flex'>
              <div className="text-[#23262a] text-[40px] font-semibold font-['Source Sans Pro'] leading-[52px]">
                {tall}
              </div>
            </div>
          </div>
          {ikon && (
            <div className='p-2 bg-[#e0d8e9] rounded-[100px] justify-center items-center gap-2 flex'>
              <div className='w-6 h-6 relative text-2xl'>{ikon}</div>
            </div>
          )}
        </div>
        <div className='self-stretch flex-col justify-start items-start flex'>
          {detaljer?.map((d, index) => (
            <div
              key={index}
              className='self-stretch pt-2 pb-3 border-b border-[#071936]/20 justify-start items-start gap-3 inline-flex'
            >
              <div className="grow shrink basis-0 text-base  font-['Source Sans Pro'] leading-tight tracking-tight">
                {d.beskrivelse}
              </div>
              <div className="text-right  text-base font-semibold font-['Source Sans Pro'] leading-tight tracking-tight">
                {d.tall}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Infokort;
