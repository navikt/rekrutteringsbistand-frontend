'use client';

import { usePathname } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { useEffect } from 'react';

export const useVisPersonTreffId = () => {
  const pathname = usePathname();

  const [visPersonTreffId, setVisPersonTreffIdSetter] = useQueryState(
    'visPersonTreffId',
    {
      defaultValue: '',
      clearOnDefault: true,
    },
  );

  useEffect(() => {
    if (!pathname.includes('/rekrutteringstreff') && visPersonTreffId !== '') {
      setVisPersonTreffIdSetter('');
    }
  }, [pathname, visPersonTreffId, setVisPersonTreffIdSetter]);

  const setVisPersonTreffId = (value: string | ((prev: string) => string)) => {
    if (pathname.includes('/rekrutteringstreff')) {
      setVisPersonTreffIdSetter(value);
    }
  };

  return [visPersonTreffId, setVisPersonTreffId] as const;
};
