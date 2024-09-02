'use client';
import * as React from 'react';
import SideLayout from '../../../components/layout/SideLayout';
import SWRLaster from '../../../components/SWRLaster';
import { useStilling } from '../../api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import StillingsIkon from './icons/se-mine-stillinger.svg';
export interface IStilling {
  stillingId: string;
}

const Stilling: React.FC<IStilling> = ({ stillingId }) => {
  const hook = useStilling(stillingId);
  return (
    <SWRLaster hook={hook}>
      {(data) => {
        return (
          <SideLayout ikon={<StillingsIkon />} tittel={data.stilling.title}>
            kake
          </SideLayout>
        );
      }}
    </SWRLaster>
  );
};

export default Stilling;
