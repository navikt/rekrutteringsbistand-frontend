import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import {
  PublisertStatus,
  RekrutteringstreffKategori,
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import { statusTag } from '@/app/rekrutteringstreff/_ui/StatusTag';
import TreffEiereOgKontorer from '@/app/rekrutteringstreff/_ui/TreffEiereOgKontorer';
import {
  datostrengTilDato,
  formaterDatoUtskrevetMåned,
} from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import { Detail, Tag } from '@navikt/ds-react';
import { FC } from 'react';

function utledPublisertStatus(
  status: RekrutteringstreffStatus,
  svarfrist: string | null,
): PublisertStatus | undefined {
  if (status !== RekrutteringstreffStatus.PUBLISERT) return undefined;
  const frist = datostrengTilDato(svarfrist);
  if (frist && frist.getTime() < Date.now()) {
    return PublisertStatus.SVARFRIST_PASSERT;
  }
  return PublisertStatus.ÅPEN_FOR_SØKERE;
}

interface RekrutteringstreffHeaderDetaljProps {
  rekrutteringstreff: RekrutteringstreffDTO;
}

const RekrutteringstreffHeaderDetalj: FC<
  RekrutteringstreffHeaderDetaljProps
> = ({ rekrutteringstreff }) => {
  const status = rekrutteringstreff.status;
  const svarfrist = rekrutteringstreff.svarfrist;
  const publisertStatus = utledPublisertStatus(
    status as RekrutteringstreffStatus,
    svarfrist,
  );
  const tag = statusTag(status as RekrutteringstreffStatus, publisertStatus);

  return (
    <Detail as='div' className={'flex flex-row flex-wrap items-center gap-1'}>
      <div
        role='group'
        aria-label='Eiere, kontorer og opprettelsesdato'
        className='flex flex-wrap items-center gap-2'
      >
        {rekrutteringstreff.eierOgKontor.length > 0 && (
          <>
            <TreffEiereOgKontorer
              eierOgKontor={rekrutteringstreff.eierOgKontor}
            />
            <span aria-hidden>•</span>
          </>
        )}
        <span>
          Opprettet{' '}
          {formaterDatoUtskrevetMåned(rekrutteringstreff.opprettetAvTidspunkt)}
        </span>
      </div>
      {rekrutteringstreff.kategori === RekrutteringstreffKategori.WORKOP && (
        <Tag data-color={'meta-purple'} size='small' variant='outline'>
          WorkOp
        </Tag>
      )}
      <Tag data-color={tag.color} size='small' variant='moderate'>
        {tag.label}
      </Tag>
    </Detail>
  );
};

export default RekrutteringstreffHeaderDetalj;
