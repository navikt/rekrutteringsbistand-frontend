import { GodkjenningSchemaDTO } from '../../../../api/kandidat-sok/schema/godkjenningSchema.zod';
import { SertifikatSchemaDTO } from '../../../../api/kandidat-sok/schema/sertifikatSchema.zod';
import GråRamme from './GråRamme';
import Erfaring from './erfaring/Erfaring';
import { SealCheckmarkIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import { compareAsc, format, parseISO } from 'date-fns';
import * as React from 'react';

export interface KandidatGodkjenningerProps {
  godkjenninger?: GodkjenningSchemaDTO[] | null;
  sertifikatObj?: SertifikatSchemaDTO[] | null;
}

const KandidatGodkjenninger: React.FC<KandidatGodkjenningerProps> = ({
  godkjenninger,
  sertifikatObj,
}) => {
  if (
    !godkjenninger ||
    !godkjenninger.length ||
    !sertifikatObj ||
    !sertifikatObj.length
  ) {
    return null;
  }
  return (
    <GråRamme tittel='Godkjenninger' ikon={<SealCheckmarkIcon />}>
      {godkjenninger
        .sort((a, b) =>
          compareAsc(
            parseISO(a?.gjennomfoert ?? ''),
            parseISO(b?.gjennomfoert ?? ''),
          ),
        )
        .map((godkjenning) => {
          return (
            <Erfaring
              key={`${godkjenning.konseptId}-${godkjenning.gjennomfoert}`}
              overskrift={godkjenning.tittel}
              detaljer={<TidsperiodeGodkjenning godkjenning={godkjenning} />}
            />
          );
        })}

      {sertifikatObj?.length > 0 &&
        sertifikatObj
          .sort((a, b) =>
            compareAsc(parseISO(a?.fraDato ?? ''), parseISO(b?.fraDato ?? '')),
          )
          .map((sertifikat) => {
            return (
              <Erfaring
                key={`${sertifikat.sertifikatKode}-${sertifikat.alternativtNavn}-${sertifikat.fraDato}`}
                overskrift={
                  sertifikat.alternativtNavn
                    ? sertifikat.alternativtNavn
                    : sertifikat.sertifikatKodeNavn
                }
                detaljer={<TidsperiodeSertifikat sertifikat={sertifikat} />}
              />
            );
          })}
    </GråRamme>
  );
};

const TidsperiodeGodkjenning = ({
  godkjenning,
}: {
  godkjenning: GodkjenningSchemaDTO;
}) => {
  if (godkjenning.gjennomfoert && godkjenning.utloeper) {
    return (
      <BodyShort size='small'>
        {format(godkjenning.gjennomfoert, 'dd.MM.yyyy')}
        {' – ' + format(godkjenning.utloeper, 'dd.MM.yyyy')}
      </BodyShort>
    );
  } else if (!godkjenning.gjennomfoert && godkjenning.utloeper) {
    return (
      <BodyShort size='small'>
        {'Utløper ' + format(godkjenning.utloeper, 'dd.MM.yyyy')}
      </BodyShort>
    );
  } else if (godkjenning.gjennomfoert) {
    return (
      <BodyShort size='small'>
        {format(godkjenning.gjennomfoert, 'dd.MM.yyyy')}
      </BodyShort>
    );
  }
};

const TidsperiodeSertifikat = ({
  sertifikat,
}: {
  sertifikat: SertifikatSchemaDTO;
}) => {
  if (sertifikat.fraDato && sertifikat.tilDato) {
    return (
      <BodyShort size='small'>
        {format(sertifikat.fraDato, 'dd.MM.yyyy')}
        {' – ' + format(sertifikat.tilDato, 'dd.MM.yyyy')}
      </BodyShort>
    );
  } else if (!sertifikat.fraDato && sertifikat.tilDato) {
    return (
      <BodyShort size='small'>
        {'Utløper ' + format(sertifikat.tilDato, 'dd.MM.yyyy')}
      </BodyShort>
    );
  } else if (sertifikat.fraDato) {
    return (
      <BodyShort size='small'>
        {format(sertifikat.fraDato, 'dd.MM.yyyy')}
      </BodyShort>
    );
  }
};

export default KandidatGodkjenninger;
