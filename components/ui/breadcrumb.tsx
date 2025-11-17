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
        'flex items-center overflow-hidden text-lg whitespace-nowrap',
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
        'flex items-center gap-1 truncate no-underline transition-colors',
        // Bruk Aksel sin action/link farge i stedet for "subtle". Fallback til default/text om variabel mangler.
        'text-[var(--ax-text-action,var(--ax-text-default))] hover:text-[var(--ax-text-action-hover,var(--ax-text-action,var(--ax-text-default)))] hover:underline',
        'font-medium',
        'focus-visible:ring-focus ring-offset-background rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
        className,
      )}
      {...props}
    >
      {icon && (
        <span className='inline-flex shrink-0 items-center text-current [&>svg]:size-4'>
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
        'text-text-default flex items-center gap-1 truncate font-medium',
        className,
      )}
      {...props}
    >
      {icon && (
        <span className='inline-flex shrink-0 items-center text-current [&>svg]:size-4'>
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
        'text-text-subtle mx-1 [&>svg]:size-3.5',
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
        'text-text-subtle flex h-6 w-6 items-center justify-center',
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
