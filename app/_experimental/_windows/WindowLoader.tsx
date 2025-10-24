import { Loader } from '@navikt/ds-react';

export default function WindowLoader() {
  return (
    <div className='flex justify-center mt-4'>
      <Loader size='xlarge' title='Laster...' />
    </div>
  );
}
