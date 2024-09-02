import { Suspense } from 'react';
import Forside from './forside/Forside';
import Loading from './laoading';

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Forside />
    </Suspense>
  );
}
