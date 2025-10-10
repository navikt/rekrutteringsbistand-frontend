import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { MoreHorizontal } from 'lucide-react';
import * as React from 'react';

function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label='breadcrumb' data-slot='breadcrumb' {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot='breadcrumb-list'
      className={cn(
        'flex items-center text-lg whitespace-nowrap overflow-hidden',
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot='breadcrumb-item'
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  asChild,
  className,
  icon,
  children,
  ...props
}: React.ComponentProps<'a'> & { asChild?: boolean; icon?: React.ReactNode }) {
  const Comp = asChild ? Slot : 'a';
  return (
    <Comp
      data-slot='breadcrumb-link'
      className={cn(
        'transition-colors truncate flex items-center gap-1 no-underline',
        // Bruk Aksel sin action/link farge i stedet for "subtle". Fallback til default/text om variabel mangler.
        'text-[var(--ax-text-action,var(--ax-text-default))] hover:text-[var(--ax-text-action-hover,var(--ax-text-action,var(--ax-text-default)))] hover:underline',
        'font-medium',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 ring-offset-background rounded-sm',
        className,
      )}
      {...props}
    >
      {icon && (
        <span className='inline-flex items-center [&>svg]:size-4 shrink-0 text-current'>
          {icon}
        </span>
      )}
      {children}
    </Comp>
  );
}

function BreadcrumbPage({
  className,
  icon,
  children,
  ...props
}: React.ComponentProps<'span'> & { icon?: React.ReactNode }) {
  return (
    <span
      data-slot='breadcrumb-page'
      role='link'
      aria-disabled='true'
      aria-current='page'
      className={cn(
        'text-text-default font-medium truncate flex items-center gap-1',
        className,
      )}
      {...props}
    >
      {icon && (
        <span className='inline-flex items-center [&>svg]:size-4 shrink-0 text-current'>
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot='breadcrumb-separator'
      role='presentation'
      aria-hidden='true'
      className={cn(
        // Eksakt 4px (0.25rem) på hver side
        '[&>svg]:size-3.5 text-text-subtle mx-1',
        className,
      )}
      {...props}
    >
      {children ?? '/'}
    </li>
  );
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot='breadcrumb-ellipsis'
      role='presentation'
      aria-hidden='true'
      className={cn(
        'flex h-6 w-6 items-center justify-center text-text-subtle',
        className,
      )}
      {...props}
    >
      <MoreHorizontal className='size-4' />
      <span className='sr-only'>Flere</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
