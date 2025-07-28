'use client';

import { usePathname } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { useEffect } from 'react';

export const useVisPersonTreffId = () => {
  const pathname = usePathname();

  const [visPersonTreffId, setVisPersonTreffId] = useQueryState(
    'visPersonTreffId',
    {
      defaultValue: '',
      clearOnDefault: true,
    },
  );

  useEffect(() => {
    if (!pathname.includes('/rekrutteringstreff') && visPersonTreffId !== '') {
      setVisPersonTreffId('');
    }
  }, [pathname, visPersonTreffId, setVisPersonTreffId]);

  const wrappedSetVisPersonTreffId = (
    value: string | ((prev: string) => string),
  ) => {
    if (pathname.includes('/rekrutteringstreff')) {
      setVisPersonTreffId(value);
    }
  };

  return [visPersonTreffId, wrappedSetVisPersonTreffId] as const;
};
