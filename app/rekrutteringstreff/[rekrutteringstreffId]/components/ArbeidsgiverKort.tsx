import { BriefcaseIcon, PlusIcon } from '@navikt/aksel-icons';
import { Box, Button, Heading, BodyShort } from '@navikt/ds-react';
import * as React from 'react';

export interface ArbeidsgiverKortProps {
  title?: string;
  description?: string;
  onAdd?: () => void;
}

const ArbeidsgiverKort: React.FC<ArbeidsgiverKortProps> = ({
  title = '',
  description = '',
  onAdd,
}) => {
  return (
    <div>
      <Heading level='2' size='medium' className='mb-4'>
        Arbeidsgivere
      </Heading>
      <Box.New className='mb-4 p-6 bg-[#1C232F] rounded-lg'>
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center justify-start'>
            <BriefcaseIcon className='w-8 h-8 text-gray-600 m-2 rounded-[100px]' />
            <div className='mx-4 justify-start'>
              <Heading level='3' size='small'>
                {title}
              </Heading>
              <BodyShort>{description}</BodyShort>
            </div>
          </div>
          <Button variant='tertiary' icon={<PlusIcon />} onClick={onAdd}>
            Legg til
          </Button>
        </div>
      </Box.New>
    </div>
  );
};

export default ArbeidsgiverKort;
