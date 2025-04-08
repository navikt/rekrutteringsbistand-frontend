import { kandidatlisteSchemaDTO } from '../../../../api/kandidat/schema.zod';
import { useStillingsContext } from '../../StillingsContext';
import { ArrowLeftIcon, ArrowRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Link } from '@navikt/ds-react';
import * as React from 'react';

export interface KandidatNavigeringProps {
  kandidatnr?: string;
  kandidatliste?: kandidatlisteSchemaDTO;
}

const KandidatNavigering: React.FC<KandidatNavigeringProps> = ({
  kandidatnr,
  kandidatliste,
}) => {
  const { stillingsData } = useStillingsContext();

  if (
    !kandidatliste ||
    !kandidatliste.kandidater ||
    kandidatliste.kandidater.length === 0
  ) {
    return null;
  }

  const index = kandidatliste.kandidater.findIndex(
    (k) => k.kandidatnr === kandidatnr,
  );

  // Fix: If candidate not found in the list, return null or an error message
  if (index === -1) {
    return null;
  }

  return (
    <div className='w-full mb-4'>
      <div className='grid grid-cols-[auto_1fr_auto] w-full items-center'>
        {/* Previous button */}
        <div className='justify-self-start'>
          {index > 0 ? (
            <Link
              className='mr-4'
              href={`/stilling/${stillingsData.stilling.uuid}/kandidat/${kandidatliste.kandidater[index - 1]?.kandidatnr}`}
            >
              <Button variant='tertiary' icon={<ArrowLeftIcon />} />
            </Link>
          ) : (
            // Add a placeholder to maintain layout even when there's no previous button
            <div className='mr-4 w-10'></div>
          )}
        </div>

        {/* Candidate names in the middle */}
        <div className='flex justify-center items-center space-x-4 overflow-x-auto px-4'>
          {kandidatliste.kandidater.map((kandidat, i) => (
            <Link
              key={kandidat.kandidatnr}
              href={`/stilling/${stillingsData.stilling.uuid}/kandidat/${kandidat.kandidatnr}`}
              className={`px-2 py-1 ${i === index ? 'font-bold bg-blue-50 rounded' : ''}`}
            >
              <BodyShort>
                {kandidat.fornavn?.[0] ?? ''}.{kandidat.etternavn ?? ''}
              </BodyShort>
            </Link>
          ))}
        </div>

        {/* Next button */}
        <div className='justify-self-end'>
          {index < kandidatliste.kandidater.length - 1 ? (
            <Link
              className='ml-4'
              href={`/stilling/${stillingsData.stilling.uuid}/kandidat/${kandidatliste.kandidater[index + 1]?.kandidatnr}`}
            >
              <Button variant='tertiary' icon={<ArrowRightIcon />} />
            </Link>
          ) : (
            // Add a placeholder to maintain layout even when there's no next button
            <div className='ml-4 w-10'></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KandidatNavigering;
