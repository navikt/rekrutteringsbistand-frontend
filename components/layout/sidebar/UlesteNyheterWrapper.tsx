import { useBrukerinnstillinger } from '@/app/api/bruker/innstillinger/useBrukerinnstillinger';
import { useNyheter } from '@/app/api/bruker/nyheter/useNyheter';
import { ReactNode, useEffect, useState } from 'react';

export interface UlesteNyheterWrapperProps {
  children: ReactNode;
}

export default function UlesteNyheterWrapper({
  children,
}: UlesteNyheterWrapperProps) {
  const { data: nyheter } = useNyheter();
  const { data: brukerinnstillinger } = useBrukerinnstillinger();

  const [harUlestNyhet, setHarUlestNyhet] = useState<boolean>(false);

  useEffect(() => {
    if (!nyheter || !brukerinnstillinger) {
      return;
    }

    const id = window.setTimeout(
      () =>
        setHarUlestNyhet(
          brukerinnstillinger.antallLesteNyheter < nyheter.length,
        ),
      0,
    );
    return () => window.clearTimeout(id);
  }, [brukerinnstillinger, nyheter]);
  return (
    <>
      {harUlestNyhet && (
        <div className='absolute top-2 left-9 h-3 w-3 rounded-full bg-[var(--ax-bg-danger-strong)]'></div>
      )}
      {children}
    </>
  );
}
