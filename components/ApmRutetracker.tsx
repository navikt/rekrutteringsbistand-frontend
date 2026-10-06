'use client';

import { skjermApmUrl } from '@/util/apm';
import { useApmRouteTracking } from '@nais/apm/react';
import { usePathname } from 'next/navigation';

export default function ApmRutetracker() {
  const pathname = usePathname();
  useApmRouteTracking(pathname === null ? null : skjermApmUrl(pathname));
  return null;
}
