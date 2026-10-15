import UtløptSesjon from './_ui/UtløptSesjon';
import { skalMocke } from '@/util/env';
import { notFound } from 'next/navigation';

export default function UtløptSesjonPage() {
  if (!skalMocke) {
    notFound();
  }
  return <UtløptSesjon />;
}
