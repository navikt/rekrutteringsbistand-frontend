import { SertifikatSchemaDTO } from '@/app/api/kandidat-sok/schema/sertifikatSchema.zod';
import { useJobbsøkerContext } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import Erfaring from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/Erfaring';
import InfoBoks from '@/components/InfoBoks';
import IkonNavnAvatar from '@/components/ui/IkonNavnAvatar';
import { BagdeIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading } from '@navikt/ds-react';
import { compareAsc, format, parseISO } from 'date-fns';

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

export default function OversiktSertifikater() {
  const { kandidatData } = useJobbsøkerContext();

  return (
    <InfoBoks>
      <div className='flex items-baseline'>
        <IkonNavnAvatar ikon={<BagdeIcon />} farge={'blå'} className={'mr-3'} />
        <Heading size='small' className='mb-4'>
          Sertifikater
        </Heading>
      </div>

      {kandidatData.sertifikatObj &&
        kandidatData.sertifikatObj
          .sort((a, b) =>
            compareAsc(parseISO(a?.fraDato ?? ''), parseISO(b?.fraDato ?? '')),
          )
          .map((sertifikat, index) => {
            return (
              <Erfaring
                key={
                  index + `${sertifikat.sertifikatKode}-${sertifikat.fraDato}`
                }
                overskrift={
                  sertifikat.alternativtNavn
                    ? sertifikat.alternativtNavn
                    : sertifikat.sertifikatKodeNavn
                }
                detaljer={<TidsperiodeSertifikat sertifikat={sertifikat} />}
              />
            );
          })}
    </InfoBoks>
  );
}
