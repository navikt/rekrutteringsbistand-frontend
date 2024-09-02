'use client';
import { useRouter } from 'next/navigation';
import Sidelaster from '../../components/Sidelaster';

export default function Stilling() {
  const router = useRouter();

  router.push('/stillingssok');

  return <Sidelaster />;
}
