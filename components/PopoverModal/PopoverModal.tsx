import { XMarkIcon } from '@navikt/aksel-icons';
import { Box, Heading } from '@navikt/ds-react';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';

export interface PopoverModalProps {
  tittel: string;
  children: React.ReactNode;
  åpneKnapp: React.ReactNode;
}

export default function PopoverModal({
  åpneKnapp,
  children,
  tittel,
}: PopoverModalProps) {
  return (
    <Popover modal>
      <PopoverTrigger asChild>{åpneKnapp}</PopoverTrigger>
      <PopoverContent side='bottom' align='start' className='z-999'>
        <Box.New
          background='raised'
          borderRadius={'12'}
          padding='5'
          shadow='dialog'
          borderColor='neutral-subtle'
          borderWidth='1'
        >
          <div className='flex justify-between'>
            <Heading level='3' size='small'>
              {tittel}
            </Heading>
            <PopoverClose>
              <XMarkIcon />
            </PopoverClose>
          </div>
          {children}
        </Box.New>
      </PopoverContent>
    </Popover>
  );
}
