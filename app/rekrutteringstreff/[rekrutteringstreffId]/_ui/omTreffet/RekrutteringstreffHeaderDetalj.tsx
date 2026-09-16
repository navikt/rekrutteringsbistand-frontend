import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import {
  PublisertStatus,
  RekrutteringstreffKategori,
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import { statusTag } from '@/app/rekrutteringstreff/_ui/StatusTag';
import {
  datostrengTilDato,
  formaterDatoUtskrevetMåned,
} from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import IkonNavnAvatar from '@/components/ui/IkonNavnAvatar';
import { hentNavkontorNavn } from '@/util/navkontorMapping';
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
      {rekrutteringstreff.eierOgKontor.map(({ navIdent, eierNavn, kontorEnhetId }) => (
        <div key={navIdent} className={'flex flex-row items-center gap-2'}>
          <IkonNavnAvatar
            fulltNavn={eierNavn ?? navIdent}
            størrelse={'sm'}
            kantfarge
            farge={'blå'}
          />
          <span>
            {eierNavn ?? navIdent} · {hentNavkontorNavn(kontorEnhetId)}
          </span>
          <span>{' • '}</span>
        </div>
      ))}
      <span>
        Opprettet{' '}
        {formaterDatoUtskrevetMåned(rekrutteringstreff.opprettetAvTidspunkt)}
      </span>
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
