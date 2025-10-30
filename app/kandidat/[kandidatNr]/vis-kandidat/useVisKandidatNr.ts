'use client';

import { useQueryState } from 'nuqs';

export const useVisKandidatNr = () => {
  const [visKandidatnr, setVisKandidatnr] = useQueryState('visKandidatnr', {
    defaultValue: '',
    clearOnDefault: true,
  });

  return [visKandidatnr, setVisKandidatnr] as const;
};
