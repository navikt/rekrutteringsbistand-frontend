'use client';

import { Tooltip } from '@navikt/ds-react';

export interface TooltipWithShowPropertyProps {
  showTooltip: boolean;
  children: React.ReactNode;
  content: string;
}

export const TooltipWithShowProperty = ({
  showTooltip,
  children,
  content,
}: TooltipWithShowPropertyProps) => {
  if (!showTooltip) {
    return <>{children}</>;
  }

  return (
    <Tooltip content={content}>
      <div>{children}</div>
    </Tooltip>
  );
};
