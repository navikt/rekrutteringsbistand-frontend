'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import * as ResizablePrimitive from 'react-resizable-panels';

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot='resizable-panel-group'
      className={cn(
        'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
        className,
      )}
      {...props}
    />
  );
}

function ResizablePanel({
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot='resizable-panel' {...props} />;
}

function ResizableHandle({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle>) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot='resizable-handle'
      className={cn(
        'relative flex items-center justify-center',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
        'data-[resize-handle-state=hover]:bg-muted data-[resize-handle-state=drag]:bg-muted',
        'transition-colors',
        'w-2',
        'bg-border',
        'data-[panel-group-direction=vertical]:h-2',
        'data-[panel-group-direction=vertical]:w-full',

        className, // Allow overriding classes
      )}
      {...props}
    />
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
