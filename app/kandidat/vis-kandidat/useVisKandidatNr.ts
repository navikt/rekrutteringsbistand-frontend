'use client';

import { usePathname } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { useEffect } from 'react';

export const useVisKandidatNr = () => {
  const pathname = usePathname();

  const [visKandidatnr, setVisKandidatnr] = useQueryState('visKandidatnr', {
    defaultValue: '',
    clearOnDefault: true,
  });

  // Set visKandidatnr to default value if path includes /rekrutteringstreff
  useEffect(() => {
    if (pathname.includes('/rekrutteringstreff') && visKandidatnr !== '') {
      setVisKandidatnr('');
    }
  }, [pathname, visKandidatnr, setVisKandidatnr]);

  return [visKandidatnr, setVisKandidatnr] as const;
};
