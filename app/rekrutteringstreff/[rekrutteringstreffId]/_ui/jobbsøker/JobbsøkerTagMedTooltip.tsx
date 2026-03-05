import { Tag, TagProps, Tooltip } from '@navikt/ds-react';
import { format } from 'date-fns';
import { FC, ReactNode } from 'react';

interface JobbsøkerTagMedTooltipProps {
  children: string;
  variant: TagProps['variant'];
  tooltip?: string;
  icon?: ReactNode;
}

export const formatDateForTooltip = (date: string | Date | null | undefined) =>
  date ? format(new Date(date), 'dd.MM.yyyy HH:mm') : '';

export const joinTooltipParts = (parts: (string | null | undefined)[]) =>
  parts.filter((p) => p && p.trim().length > 0).join(' · ');

const JobbsøkerTagMedTooltip: FC<JobbsøkerTagMedTooltipProps> = ({
  children,
  variant,
  tooltip,
  icon,
}) => {
  if (!tooltip || tooltip.trim().length === 0) {
    return (
      <Tag size='medium' variant={variant} icon={icon} className='text-nowrap'>
        {children}
      </Tag>
    );
  }

  return (
    <Tooltip content={tooltip} className='text-left whitespace-pre-line'>
      <Tag
        size='medium'
        variant={variant}
        icon={icon}
        className='cursor-help text-nowrap'
      >
        {children}
      </Tag>
    </Tooltip>
  );
};

export default JobbsøkerTagMedTooltip;
