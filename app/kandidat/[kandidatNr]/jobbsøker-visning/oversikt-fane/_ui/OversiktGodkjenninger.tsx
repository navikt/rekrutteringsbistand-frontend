import { GodkjenningSchemaDTO } from '@/app/api/kandidat-sok/schema/godkjenningSchema.zod';
import { useJobbsøkerContext } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import Erfaring from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/Erfaring';
import InfoBoks from '@/components/InfoBoks';
import { BodyShort, Heading } from '@navikt/ds-react';
import { compareAsc, format, parseISO } from 'date-fns';

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

export default function OversiktGodkjenninger() {
  const { kandidatData } = useJobbsøkerContext();
  return (
    <InfoBoks>
      <Heading size='small' className='mb-4'>
        Godkjenninger
      </Heading>
      {kandidatData?.godkjenninger &&
        kandidatData?.godkjenninger
          .sort((a, b) =>
            compareAsc(
              parseISO(a?.gjennomfoert ?? ''),
              parseISO(b?.gjennomfoert ?? ''),
            ),
          )
          .map((godkjenning, index) => {
            return (
              <Erfaring
                key={
                  index + `${godkjenning.konseptId}-${godkjenning.gjennomfoert}`
                }
                overskrift={godkjenning.tittel}
                detaljer={<TidsperiodeGodkjenning godkjenning={godkjenning} />}
              />
            );
          })}
    </InfoBoks>
  );
}
