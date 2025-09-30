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
import { Link } from '@navikt/ds-react';
import { Fragment, ReactNode } from 'react';

export interface RekrutteringstreffBreadcrumbItem {
  label: ReactNode;
  href?: string;
}

interface RekrutteringstreffBreadcrumbsProps {
  items?: RekrutteringstreffBreadcrumbItem[];
}

export const RekrutteringstreffBreadcrumbs = ({
  items = [],
}: RekrutteringstreffBreadcrumbsProps) => {
  const ekstra = items.filter((item) => !!item && item.label !== undefined);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href='/rekrutteringstreff'
              className='inline-flex items-center gap-2 text-lg'
            >
              <ReceptionIcon aria-hidden className='h-6 w-6 shrink-0' />
              <span>Rekrutteringstreff</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {ekstra.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbSeparator className='text-foreground'>
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink asChild>
                  <Link href={item.href} className='text-lg'>
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className='text-lg font-normal'>
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
