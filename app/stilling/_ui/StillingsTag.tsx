import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import {
  AdminStatus,
  StillingsStatus,
} from '@/app/stilling/_ui/stilling-typer';
import {
  VisningsStatus,
  visStillingsDataInfo,
} from '@/app/stilling/_util/stillingInfoUtil';
import { Tag } from '@navikt/ds-react';
import { isBefore, startOfToday } from 'date-fns';
import { FC } from 'react';

export interface IStillingTag {
  stillingsData: RekrutteringsbistandStillingSchemaDTO | StillingsDataDTO;
}

const utløperFørIdag = (expires: string | null) => {
  if (!expires) return false;
  return isBefore(new Date(expires), startOfToday());
};

export const stillingErUtløpt = (stilling: any): boolean => {
  return (
    stilling.publishedByAdmin !== null &&
    stilling.status === StillingsStatus.Inaktiv &&
    utløperFørIdag(stilling.expires) &&
    stilling.administration?.status === AdminStatus.Done
  );
};

const StillingsTag: FC<IStillingTag> = ({ stillingsData }) => {
  const info = visStillingsDataInfo(stillingsData);

  const tagKlasse = (extra?: string) => `${extra ?? ''}`;

  const venstre = (
    <>
      {info.erJobbMesse && (
        <Tag
          data-color='meta-lime'
          className={tagKlasse()}
          size='small'
          variant='outline'
        >
          Jobbmesse
        </Tag>
      )}
      {info.erPåArbeidsplassen && (
        <Tag
          data-color='info'
          className={tagKlasse()}
          size='small'
          variant='outline'
        >
          arbeidsplassen.no
        </Tag>
      )}
    </>
  );

  const høyre = (
    <>
      {info.visningsStatus === VisningsStatus.IkkePublisert && (
        <Tag
          data-color='warning'
          className={tagKlasse()}
          size='small'
          variant='moderate'
        >
          {VisningsStatus.IkkePublisert}
        </Tag>
      )}
      {info.visningsStatus === VisningsStatus.ApenForSokere && (
        <Tag
          data-color='info'
          className={tagKlasse()}
          size='small'
          variant='moderate'
        >
          {VisningsStatus.ApenForSokere}
        </Tag>
      )}
      {info.visningsStatus === VisningsStatus.StengtForSokere && (
        <Tag
          data-color='warning'
          className={tagKlasse()}
          size='small'
          variant='moderate'
        >
          {VisningsStatus.StengtForSokere}
        </Tag>
      )}
      {info.visningsStatus === VisningsStatus.UtloptStengtForSokere && (
        <Tag
          data-color='warning'
          className={tagKlasse()}
          size='small'
          variant='moderate'
        >
          {VisningsStatus.UtloptStengtForSokere}
        </Tag>
      )}

      {info.visningsStatus === VisningsStatus.Fullfort && (
        <Tag
          data-color='success'
          className={tagKlasse()}
          size='small'
          variant='moderate'
        >
          {VisningsStatus.Fullfort}
        </Tag>
      )}
      {info.visningsStatus === VisningsStatus.Slettet && (
        <Tag
          data-color='danger'
          className={tagKlasse()}
          size='small'
          variant='moderate'
        >
          {VisningsStatus.Slettet}
        </Tag>
      )}
    </>
  );

  return (
    <div className='flex flex-wrap gap-1.5'>
      {venstre}
      {høyre}
    </div>
  );
};

export default StillingsTag;
