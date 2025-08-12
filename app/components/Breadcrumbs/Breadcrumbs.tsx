'use client';

import { useBreadcrumbsLabels } from './BreadcrumbsProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const { labels } = useBreadcrumbsLabels();

  const segments = React.useMemo(
    () => pathname.split('/').filter(Boolean),
    [pathname],
  );

  if (segments.length <= 1) return null;

  const breadcrumbs = segments.map((_, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/');
    const raw = segments[idx];
    const fallback = raw.charAt(0).toUpperCase() + raw.slice(1);
    const label = labels[href] ?? fallback;
    return { href, label };
  });

  return (
    <nav aria-label='breadcrumb' className='py-2'>
      <ol className='flex space-x-2'>
        {breadcrumbs.map((b, i) => (
          <li key={b.href} className='flex items-center'>
            {i > 0 && <span className='mx-2'>/</span>}
            {i === breadcrumbs.length - 1 ? (
              <span className='text-gray-500' aria-current='page'>
                {b.label}
              </span>
            ) : (
              <Link href={b.href} className='hover:underline'>
                {b.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
