import { StillingsDataDTO } from '../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { RekrutteringsbistandStillingSchemaDTO } from '../../api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import { eierStilling } from '../../components/tilgangskontroll/erEier';
import { formaterNorskDato } from '../../components/util';
import { useApplikasjonContext } from '../../providers/ApplikasjonContext';
import {
  AdminStatus,
  StillingsStatus,
  Stillingskategori,
} from '../../stilling/stilling-typer';
import { Hovedtag } from './StillingsSøkFilter/InkluderingFilter';
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

  const stillingStatus = stillingsData.stilling.status as StillingsStatus;

  const erFormidling =
    stillingsData?.stillingsinfo?.stillingskategori ===
    Stillingskategori.Formidling;

  const stillingenBlirPubliserDato =
    'stilling' in stillingsData &&
    'activationOnPublishingDate' in stillingsData.stilling
      ? stillingsData.stilling.activationOnPublishingDate
      : undefined;

  const stillingUløpt = stillingErUtløpt(stillingsData.stilling);

  const publisertDato = stillingsData.stilling.published
    ? formaterNorskDato({ dato: stillingsData.stilling.published })
    : '-';

  const erEierTag = erEier;

  const erIkkePublisertTag =
    !stillingUløpt &&
    !stillingenBlirPubliserDato &&
    stillingStatus === StillingsStatus.Inaktiv;

  const erUtkastTag = !stillingsData.stilling.publishedByAdmin;
  const erStoppetTag = stillingStatus === StillingsStatus.Stoppet;
  const erJobbmesseTag =
    stillingsData?.stillingsinfo?.stillingskategori ===
    Stillingskategori.Jobbmesse;
  const erSlettetTag = stillingStatus === StillingsStatus.Slettet;
  const direktemeldtTag = stillingsData?.stilling?.source === 'DIR';

  const arbeidsplassenTag = stillingsData?.stilling?.privacy === 'SHOW_ALL';

  const registrertMedInkluderingsmulighetTag =
    Array.isArray(stillingsData?.stilling?.properties?.tags) &&
    stillingsData.stilling.properties.tags.some((tag: any) =>
      Object.values(Hovedtag).includes(tag),
    );

  const venstre = (
    <>
      {erJobbmesseTag && (
        <Tag className={'mr-2 mb-4'} size='small' variant='alt2'>
          Jobbmesse
        </Tag>
      )}
      {erEierTag && (
        <Tag className={'mr-2 mb-4'} size='small' variant='info'>
          Min stilling
        </Tag>
      )}
      {stillingUløpt && (
        <Tag className={'mr-2 mb-4'} size='small' variant='warning'>
          Utløpt
        </Tag>
      )}
      {erIkkePublisertTag && (
        <Tag className={'mr-2 mb-4'} size='small' variant='warning'>
          Ikke publisert
        </Tag>
      )}
      {erUtkastTag && (
        <Tag className={'mr-2 mb-4'} size='small' variant='alt1'>
          Utkast
        </Tag>
      )}
      {erStoppetTag && (
        <Tag className={'mr-2 mb-4'} size='small' variant='error'>
          Stoppet
        </Tag>
      )}
      {erSlettetTag && (
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
      {direktemeldtTag && (
        <Tag className={'mr-2 mb-4'} size='small' variant='alt1'>
          Intern {erFormidling ? 'formidling' : ''}
        </Tag>
      )}
      {arbeidsplassenTag && (
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
