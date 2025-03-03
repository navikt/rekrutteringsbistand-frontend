'use client';

import Sidelaster from '../components/Sidelaster';
import { useRouter } from 'next/navigation';

export default function Stilling() {
  const router = useRouter();

  router.push('/stillings-sok');

  return <Sidelaster />;
}
