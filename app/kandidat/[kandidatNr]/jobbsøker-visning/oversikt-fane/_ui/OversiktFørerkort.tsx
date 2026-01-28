import { FørerkortSchemaDTO } from '@/app/api/kandidat-sok/schema/forerkortSchema.zod';
import { useJobbsøkerContext } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import Erfaring from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/Erfaring';
import InfoBoks from '@/components/InfoBoks';
import IkonNavnAvatar from '@/components/ui/IkonNavnAvatar';
import { CarIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading } from '@navikt/ds-react';
import { compareAsc, format, parseISO } from 'date-fns';

const FørerkortTidsperiode = ({
  førerkort,
}: {
  førerkort: FørerkortSchemaDTO;
}) => {
  if (førerkort?.fraDato && førerkort?.tilDato) {
    return (
      <BodyShort size='small'>
        {format(førerkort.fraDato, 'dd.MM.yyyy')}
        {' – ' + format(førerkort.tilDato, 'dd.MM.yyyy')}
      </BodyShort>
    );
  } else {
    return null;
  }
};

export default function OversiktFørerkort() {
  const { kandidatData } = useJobbsøkerContext();
  const førerkort = kandidatData?.forerkort;

  if (!førerkort || !førerkort.length) {
    return null;
  }

  const fjernetDuplikater = fjernDuplikater(førerkort).sort((a, b) =>
    compareAsc(parseISO(a?.fraDato ?? ''), parseISO(b?.fraDato ?? '')),
  );
  return (
    <InfoBoks>
      <div className='flex items-baseline'>
        <IkonNavnAvatar ikon={<CarIcon />} farge={'blå'} className={'mr-3'} />
        <Heading size='small' className='mb-4'>
          Førerkort
        </Heading>
      </div>
      {fjernetDuplikater.map((kort, index) => (
        <Erfaring
          key={index + `${kort?.forerkortKode}-${kort?.fraDato}`}
          overskrift={kort?.forerkortKodeKlasse}
          beskrivelse={kort?.forerkortKode}
          detaljer={<FørerkortTidsperiode førerkort={kort} />}
        />
      ))}
    </InfoBoks>
  );
}

const fjernDuplikater = (forerkortListe: FørerkortSchemaDTO[]) => {
  const forerkortAlleredeILista = new Set();

  return forerkortListe.filter((forerkort) => {
    const forerkortetErIkkeAlleredeLagtTil = !forerkortAlleredeILista.has(
      forerkort?.forerkortKodeKlasse,
    );

    forerkortAlleredeILista.add(forerkort?.forerkortKodeKlasse);
    return forerkortetErIkkeAlleredeLagtTil;
  });
};
