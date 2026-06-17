import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import {
  PublisertStatus,
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

  const kontorer = rekrutteringstreff.kontorer;

  const treffeiereVisning = () => {
    const eiere = rekrutteringstreff.eiere;
    if (eiere?.length === 1) {
      return (
        <div className={'flex flex-row items-center gap-2'}>
          <IkonNavnAvatar
            fulltNavn={eiere[0]}
            størrelse={'sm'}
            kantfarge
            farge={'blå'}
          />
          {eiere[0]}
        </div>
      );
    }
    return (
      <>
        <div className={'ml-2 flex flex-row items-center'}>
          {eiere?.map((eier, index) => {
            const zIndex = eiere.length - index;
            return (
              <div key={index} style={{ zIndex: zIndex }}>
                <IkonNavnAvatar
                  fulltNavn={eier}
                  størrelse={'sm'}
                  kantfarge
                  farge={'blå'}
                  className={'-ml-2'}
                />
              </div>
            );
          })}
        </div>
        {eiere && eiere.length > 0 && (
          <>
            {eiere[0]} og {eiere.length - 1}{' '}
            {eiere.length - 1 === 1 ? 'annen' : 'andre'}
          </>
        )}
      </>
    );
  };
  return (
    <Detail as='div' className={'flex flex-row flex-wrap items-center gap-1'}>
      {treffeiereVisning()}
      <span>{' • '}</span>
      <span>
        Opprettet{' '}
        {formaterDatoUtskrevetMåned(rekrutteringstreff.opprettetAvTidspunkt)}
      </span>
      {kontorer.length > 0 && (
        <>
          <span>{' • '}</span>
          <span>{kontorer.map((k) => hentNavkontorNavn(k)).join(', ')}</span>
        </>
      )}
      <Tag data-color={tag.color} size='small' variant='moderate'>
        {tag.label}
      </Tag>
    </Detail>
  );
};

export default RekrutteringstreffHeaderDetalj;
