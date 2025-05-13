'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

const generateBreadcrumbs = (pathname: string) => {
  const pathSegments = pathname.split('/').filter((segment) => segment);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    // Capitalize the first letter for display, or use a mapping for better names
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { href, label };
  });
  // Add a "Home" breadcrumb at the beginning
  return [{ href: '/', label: 'Hjem' }, ...breadcrumbs];
};

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label='breadcrumb' className='py-2'>
      <ol className='flex space-x-2'>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className='flex items-center'>
            {index > 0 && <span className='mx-2'>/</span>}
            {index === breadcrumbs.length - 1 ? (
              <span className='text-gray-500' aria-current='page'>
                {breadcrumb.label}
              </span>
            ) : (
              <Link href={breadcrumb.href} className='hover:underline'>
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
