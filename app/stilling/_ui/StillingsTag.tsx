import { Hovedtag } from './StillingsSøkFilter/InkluderingFilter';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import { AdminStatus, StillingsStatus } from '@/app/stilling/stilling-typer';
import { visStillingsDataInfo } from '@/app/stilling/stillingInfoUtil';
import { eierStilling } from '@/components/tilgangskontroll/erEier';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { formaterNorskDato } from '@/util/util';
import { Tag } from '@navikt/ds-react';
import { isBefore, startOfToday } from 'date-fns';
import * as React from 'react';

export interface IStillingTag {
  stillingsData: RekrutteringsbistandStillingSchemaDTO | StillingsDataDTO;
  splitTags?: boolean;
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

const StillingsTag: React.FC<IStillingTag> = ({ stillingsData, splitTags }) => {
  const {
    brukerData: { ident },
  } = useApplikasjonContext();

  const erEier = eierStilling({
    stillingsData: stillingsData,
    navIdent: ident,
  });

  const stillingsDataInfo = visStillingsDataInfo(stillingsData);
  const stillingStatus = stillingsData.stilling.status as StillingsStatus;
  const stillingenBlirPubliserDato =
    'stilling' in stillingsData &&
    'activationOnPublishingDate' in stillingsData.stilling
      ? stillingsData.stilling.activationOnPublishingDate
      : undefined;

  const publisertDato = stillingsData.stilling.published
    ? formaterNorskDato({ dato: stillingsData.stilling.published })
    : '-';

  const erEierTag = erEier;
  const erIkkePublisertTag =
    !stillingsDataInfo.erUtløpt &&
    !stillingenBlirPubliserDato &&
    stillingStatus === StillingsStatus.Inaktiv;

  const registrertMedInkluderingsmulighetTag =
    Array.isArray(stillingsData?.stilling?.properties?.tags) &&
    stillingsData.stilling.properties.tags.some((tag: any) =>
      Object.values(Hovedtag).includes(tag),
    );

  const venstre = (
    <>
      {stillingsDataInfo.erJobbMesse && (
        <Tag className={'mr-2 mb-4'} size='small' variant='alt2'>
          Jobbmesse
        </Tag>
      )}
      {erEierTag && (
        <Tag className={'mr-2 mb-4'} size='small' variant='info'>
          Min stilling
        </Tag>
      )}
      {stillingsDataInfo.erUtløpt && (
        <Tag className={'mr-2 mb-4'} size='small' variant='warning'>
          Utløpt
        </Tag>
      )}
      {erIkkePublisertTag && (
        <Tag className={'mr-2 mb-4'} size='small' variant='warning'>
          Ikke publisert
        </Tag>
      )}
      {stillingsDataInfo.erUtkast && (
        <Tag className={'mr-2 mb-4'} size='small' variant='alt1'>
          Utkast
        </Tag>
      )}
      {stillingsDataInfo.erStoppet && (
        <Tag className={'mr-2 mb-4'} size='small' variant='error'>
          Stoppet
        </Tag>
      )}
      {stillingsDataInfo.erSlettet && (
        <Tag className={'mr-2 mb-4'} size='small' variant='error'>
          Slettet
        </Tag>
      )}
    </>
  );

  const høyre = (
    <>
      {registrertMedInkluderingsmulighetTag && (
        <Tag className={'mr-2 mb-4'} size='small' variant='success'>
          Inkludering
        </Tag>
      )}
      {stillingsDataInfo.erDirektemeldt && (
        <Tag className={'mr-2 mb-4'} size='small' variant='alt1'>
          Intern {stillingsDataInfo.erFormidling ? 'formidling' : ''}
        </Tag>
      )}
      {stillingsDataInfo.erPåArbeidsplassen && (
        <Tag className={'mr-2 mb-4'} size='small' variant='alt3'>
          Arbeidsplassen
        </Tag>
      )}
    </>
  );

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
