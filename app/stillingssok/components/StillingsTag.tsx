import { BodyShort, Tag } from '@navikt/ds-react';
import * as React from 'react';

export interface IStillingTag {
  publisert: string;
  erEier?: boolean;
  erUtløpt?: boolean;
  erIkkePublisert?: boolean;
  erUtkast?: boolean;
  erStoppet?: boolean;
  erJobbmesse?: boolean;
  erSlettet?: boolean;
  direktemeldt?: boolean;
  registrertMedInkluderingsmulighet?: boolean;
  arbeidsplassen?: boolean;
}

const StillingsTag: React.FC<IStillingTag> = (tag) => {
  return (
    <div className='flex justify-between'>
      <div>
        <div className='mb-2 mr-2 text-sm '>
          <BodyShort>{tag.publisert}</BodyShort>
        </div>
        {tag.erJobbmesse && (
          <Tag className={'mr-2 mb-4'} size='small' variant='alt2'>
            Jobbmesse
          </Tag>
        )}
        {tag.erEier && (
          <Tag className={'mr-2 mb-4'} size='small' variant='info'>
            Min stilling
          </Tag>
        )}
        {tag.erUtløpt && (
          <Tag className={'mr-2 mb-4'} size='small' variant='warning'>
            Utløpt
          </Tag>
        )}
        {tag.erIkkePublisert && (
          <Tag className={'mr-2 mb-4'} size='small' variant='warning'>
            Ikke publisert
          </Tag>
        )}
        {tag.erUtkast && (
          <Tag className={'mr-2 mb-4'} size='small' variant='alt1'>
            Utkast
          </Tag>
        )}
        {tag.erStoppet && (
          <Tag className={'mr-2 mb-4'} size='small' variant='error'>
            Stoppet
          </Tag>
        )}
        {tag.erSlettet && (
          <Tag className={'mr-2 mb-4'} size='small' variant='error'>
            Slettet
          </Tag>
        )}
      </div>
      <div>
        {tag.registrertMedInkluderingsmulighet && (
          <Tag className={'mr-2 '} size='small' variant='success'>
            Inkludering
          </Tag>
        )}
        {tag.direktemeldt && (
          <Tag className={'mr-2'} size='small' variant='alt1'>
            Intern
          </Tag>
        )}
        {tag.arbeidsplassen && (
          <Tag className={'mr-2 '} size='small' variant='alt3'>
            Arbeidsplassen
          </Tag>
        )}
      </div>
    </div>
  );
};

export default StillingsTag;
