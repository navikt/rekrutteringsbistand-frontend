'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ReceptionIcon } from '@navikt/aksel-icons';
import Link from 'next/link';
import { Fragment, ReactNode } from 'react';

export interface RekrutteringstreffBreadcrumbItem {
  label: ReactNode;
  href?: string;
}

interface RekrutteringstreffBreadcrumbsProps {
  /**
   * Optional ekstra brødsmuler som vises etter hovedlenken «Rekrutteringstreff».
   * Elementet uten href behandles som aktiv side.
   */
  items?: RekrutteringstreffBreadcrumbItem[];
}

export const RekrutteringstreffBreadcrumbs = ({
  items = [],
}: RekrutteringstreffBreadcrumbsProps) => {
  const ekstra = items.filter((item) => !!item && item.label !== undefined);

  return (
    <div className='flex items-center gap-2'>
      <ReceptionIcon aria-hidden className='h-5 w-5 shrink-0' />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/rekrutteringstreff'>Rekrutteringstreff</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {ekstra.map((item, index) => (
            <Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
