'use client';

import { SplitScreenLayout } from '../components/layout/SplitScreenLayout';
import * as React from 'react';

export interface RekrutteringsTreffLayoutProps {
  children?: React.ReactNode | undefined;
}

const RekrutteringsTreffLayout: React.FC<RekrutteringsTreffLayoutProps> = ({
  children,
}) => {
  return <SplitScreenLayout>{children}</SplitScreenLayout>;
};

export default RekrutteringsTreffLayout;
