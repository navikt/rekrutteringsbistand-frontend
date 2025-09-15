import { Skeleton } from '@navikt/ds-react';

export default function SkeletonKort() {
  return (
    <div className='flex flex-col gap-1'>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} variant='rectangle' width='100%' height={88} />
      ))}
    </div>
  );
}
