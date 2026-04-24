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
import { formaterNorskDato } from '@/util/dato';
import { Tag } from '@navikt/ds-react';
import { isBefore, startOfToday } from 'date-fns';
import { FC } from 'react';

export interface IStillingTag {
  stillingsData: RekrutteringsbistandStillingSchemaDTO | StillingsDataDTO;
  rad?: boolean; // hvis true: alle tags på én rad samlet (ignorerer splitTags)
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

const StillingsTag: FC<IStillingTag> = ({ stillingsData, rad }) => {
  const info = visStillingsDataInfo(stillingsData);

  const publisertDato = stillingsData.stilling.published
    ? formaterNorskDato({ dato: stillingsData.stilling.published })
    : '-';

  const tagKlasse = (extra?: string) => `${rad ? '' : ''} ${extra ?? ''}`;

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

  if (rad) {
    return (
      <div className='flex flex-row flex-wrap gap-2'>
        <span className='whitespace-nowrap'>{publisertDato} </span>
        {venstre}
        {høyre}
      </div>
    );
  }

  return (
    <div className='flex flex-wrap gap-1.5'>
      {venstre}
      {høyre}
    </div>
  );
};

export default StillingsTag;
