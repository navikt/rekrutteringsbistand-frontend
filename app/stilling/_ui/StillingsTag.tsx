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
import { formaterNorskDato } from '@/util/util';
import { Tag } from '@navikt/ds-react';
import { isBefore, startOfToday } from 'date-fns';
import { FC } from 'react';

export interface IStillingTag {
  stillingsData: RekrutteringsbistandStillingSchemaDTO | StillingsDataDTO;
  splitTags?: boolean; // viser venstre og høyre i hver sin side
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

const StillingsTag: FC<IStillingTag> = ({ stillingsData, splitTags, rad }) => {
  const info = visStillingsDataInfo(stillingsData);

  const publisertDato = stillingsData.stilling.published
    ? formaterNorskDato({ dato: stillingsData.stilling.published })
    : '-';

  const tagKlasse = (extra?: string) =>
    `mr-2 ${rad ? '' : 'mb-4'} ${extra ?? ''}`;

  const venstre = (
    <>
      {info.erJobbMesse && (
        <Tag className={tagKlasse()} size='small' variant='alt2'>
          Jobbmesse
        </Tag>
      )}
      {info.erPåArbeidsplassen && (
        <Tag className={tagKlasse()} size='small' variant='alt3'>
          arbeidsplassen.no
        </Tag>
      )}
    </>
  );

  const høyre = (
    <>
      {info.visningsStatus === VisningsStatus.IkkePublisert && (
        <Tag className={tagKlasse()} size='small' variant='warning-moderate'>
          {VisningsStatus.IkkePublisert}
        </Tag>
      )}
      {info.visningsStatus === VisningsStatus.ApenForSokere && (
        <Tag className={tagKlasse()} size='small' variant='alt3-moderate'>
          {VisningsStatus.ApenForSokere}
        </Tag>
      )}
      {info.visningsStatus === VisningsStatus.StengtForSokere && (
        <Tag className={tagKlasse()} size='small' variant='warning-moderate'>
          {VisningsStatus.StengtForSokere}
        </Tag>
      )}
      {info.visningsStatus === VisningsStatus.UtloptStengtForSokere && (
        <Tag className={tagKlasse()} size='small' variant='warning-moderate'>
          {VisningsStatus.UtloptStengtForSokere}
        </Tag>
      )}

      {info.visningsStatus === VisningsStatus.Fullfort && (
        <Tag className={tagKlasse()} size='small' variant='success-moderate'>
          {VisningsStatus.Fullfort}
        </Tag>
      )}
      {info.visningsStatus === VisningsStatus.Avbrutt && (
        <Tag className={tagKlasse()} size='small' variant='error-moderate'>
          {VisningsStatus.Avbrutt}
        </Tag>
      )}
    </>
  );

  if (rad) {
    return (
      <div className='flex flex-row flex-nowrap overflow-x-auto'>
        <span className='mr-4'>{publisertDato} </span>
        {venstre}
        {høyre}
      </div>
    );
  }

  return splitTags ? (
    <div className='flex justify-between'>
      <div className='flex'>
        <span className='mr-4'>{publisertDato} </span>
        <div className='max-h-16'>{venstre}</div>
      </div>
      <div className='max-h-16'>{høyre}</div>
    </div>
  ) : (
    <div className='flex justify-between'>
      {venstre}
      {høyre}
    </div>
  );
};

export default StillingsTag;
