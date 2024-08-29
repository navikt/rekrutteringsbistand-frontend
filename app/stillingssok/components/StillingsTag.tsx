import { Tag } from '@navikt/ds-react';
import * as React from 'react';

export interface IStillingTag {
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
        {tag.erJobbmesse && (
          <Tag size='small' variant='alt2' className={'mr-2'}>
            Jobbmesse
          </Tag>
        )}
        {tag.erEier && (
          <Tag size='small' variant='info' className={'mr-2'}>
            Min stilling
          </Tag>
        )}
        {tag.erUtløpt && (
          <Tag size='small' variant='warning' className={'mr-2'}>
            Utløpt
          </Tag>
        )}
        {tag.erIkkePublisert && (
          <Tag size='small' variant='warning' className={'mr-2'}>
            Ikke publisert
          </Tag>
        )}
        {tag.erUtkast && (
          <Tag size='small' variant='alt1' className={'mr-2'}>
            Utkast
          </Tag>
        )}
        {tag.erStoppet && (
          <Tag size='small' variant='error' className={'mr-2'}>
            Stoppet
          </Tag>
        )}
        {tag.erSlettet && (
          <Tag size='small' variant='error' className={'mr-2'}>
            Slettet
          </Tag>
        )}
      </div>
      <div>
        {tag.registrertMedInkluderingsmulighet && (
          <Tag size='small' variant='success' className={'mr-2'}>
            Inkludering
          </Tag>
        )}
        {tag.direktemeldt && (
          <Tag size='small' variant='alt1' className={'mr-2'}>
            Intern
          </Tag>
        )}
        {tag.arbeidsplassen && (
          <Tag size='small' variant='alt3' className={'mr-2'}>
            Arbeidsplassen
          </Tag>
        )}
      </div>
    </div>
  );
};

export default StillingsTag;
