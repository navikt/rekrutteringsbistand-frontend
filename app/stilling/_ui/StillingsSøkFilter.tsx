import { SidepanelTrigger } from '@/components/layout/SidepanelTrigger';
import { FilterIcon } from '@navikt/aksel-icons';
import { type FC } from 'react';

const StillingsSøkFilter: FC<{
  formidlinger?: boolean;
  stillingForKandidat?: string;
}> = () => {
  return (
    <div className='@container flex flex-row items-center justify-end contain-layout'>
      <div className='flex gap-2'>
        <SidepanelTrigger skjulOver='1024px' icon={<FilterIcon aria-hidden />}>
          Filtrer
        </SidepanelTrigger>
      </div>
    </div>
  );
};

export default StillingsSøkFilter;
