import { Tag } from '@navikt/ds-react';
import { format, startOfDay } from 'date-fns';
import * as React from 'react';
import { eierStilling } from '../../../components/tilgangskontroll/erEier';
import { stillingsDTO } from '../../api/stilling/rekrutteringsbistandstilling/[slug]/zod';
import { useApplikasjonContext } from '../../ApplikasjonContext';
import {
  AdminStatus,
  Status,
  Stillingskategori,
} from '../../stilling/stilling-typer';
import { StillingsSøkStillingDTO } from '../stillingssøk-typer';
import { Hovedtag } from './StillingsSøkFilter/InkluderingFilter';

export interface IStillingTag {
  stillingsData: StillingsSøkStillingDTO | stillingsDTO;
  splitTags?: boolean;
}

const utløperFørIdag = (expires: string | null) => {
  if (expires === null) {
    return false;
  }

  const startenAvDøgnet = startOfDay(new Date());
  return new Date(expires) <= startenAvDøgnet;
};

export const stillingErUtløpt = (stilling: any): boolean => {
  return (
    stilling.publishedByAdmin !== null &&
    stilling.status === Status.Inaktiv &&
    utløperFørIdag(stilling.expires) &&
    stilling.administration?.status === AdminStatus.Done
  );
};

const StillingsTag: React.FC<IStillingTag> = ({ stillingsData, splitTags }) => {
  const { navIdent } = useApplikasjonContext();

  const erEier = eierStilling({
    stillingsData: stillingsData,
    navIdent: navIdent,
  });

  const stillingStatus = stillingsData.stilling.status as Status;

  const stillingenBlirPubliserDato =
    'stilling' in stillingsData &&
    'activationOnPublishingDate' in stillingsData.stilling
      ? stillingsData.stilling.activationOnPublishingDate
      : undefined;

  const stillingUløpt = stillingErUtløpt(stillingsData.stilling);

  const publisertDato = stillingsData.stilling.published
    ? format(stillingsData.stilling.published, 'dd.MM.yyyy')
    : '-';
  const utløpsDato = stillingsData.stilling.expires
    ? format(stillingsData.stilling.expires, 'dd.MM.yyyy')
    : '-';

  // const publisertTag = stillingsData.stilling.publishedByAdmin
  //   && publisertDato !== utløpsDato
  //   ? true
  //   : false;

  const erEierTag = erEier;
  const erUtløptTag =
    !!stillingsData.stilling.publishedByAdmin &&
    status === Status.Inaktiv &&
    !stillingUløpt;

  const erIkkePublisertTag =
    !stillingUløpt &&
    !stillingenBlirPubliserDato &&
    stillingStatus === Status.Inaktiv;

  const erUtkastTag = !stillingsData.stilling.publishedByAdmin;
  const erStoppetTag = stillingStatus === Status.Stoppet;
  const erJobbmesseTag =
    stillingsData?.stillingsinfo?.stillingskategori ===
    Stillingskategori.Jobbmesse;
  const erSlettetTag = stillingStatus === Status.Slettet;
  const direktemeldtTag = stillingsData?.stillingsinfo?.source === 'DIR';

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
      {erUtløptTag && (
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
          Intern
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
      <div>
        <span className='mr-4'>{publisertDato} </span>
        {venstre}
      </div>
      <div>{høyre}</div>
    </div>
  ) : (
    <>
      {venstre}
      {høyre}
    </>
  );
};

export default StillingsTag;
