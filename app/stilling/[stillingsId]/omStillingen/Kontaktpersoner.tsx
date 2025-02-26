import { BodyShort, Heading, Link } from '@navikt/ds-react';
import * as React from 'react';
import { useStillingsContext } from '../StillingsContext';

const Kontaktpersoner: React.FC = () => {
  const { stillingsData } = useStillingsContext();
  const kontaktInfo = stillingsData?.stilling?.contactList;

  return (
    <div className='pt-10'>
      <Heading size='small' className='mb-4'>
        {kontaktInfo?.length && kontaktInfo?.length > 1
          ? 'Kontaktpersoner'
          : 'Kontaktperson'}
      </Heading>
      <div className='grid grid-cols-2 gap-8'>
        {kontaktInfo?.map((kontakt, index) => (
          <dl key={index}>
            <div className='mb-1'>
              <BodyShort className='font-bold'>
                {kontakt.name}, {kontakt.title}
              </BodyShort>
            </div>
            <div className='flex'>
              <Link href={`mailto:${kontakt.email}`} className='block'>
                {kontakt.email}
              </Link>
              {kontakt.phone && (
                <BodyShort className='ml-2'>
                  Tlf {kontakt.phone?.replace(/(\d{2})/g, '$1 ').trim()}
                </BodyShort>
              )}
            </div>
          </dl>
        ))}
      </div>
    </div>
  );
};

export default Kontaktpersoner;
