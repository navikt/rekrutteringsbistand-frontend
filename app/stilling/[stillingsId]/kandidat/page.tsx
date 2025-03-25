'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function KandidatUtenId() {
  const router = useRouter();
  const pathname = usePathname();
  const newPathname = pathname.replace('/kandidat', '');
  router.replace(newPathname);
  return null;
}
