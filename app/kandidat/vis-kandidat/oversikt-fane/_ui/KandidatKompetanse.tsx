import GråBoks from './GråBoks';
import Erfaring from './erfaring/Erfaring';
import { KompetanseSchemaDTO } from '@/app/api/kandidat-sok/schema/kompetanseSchema.zod';
import { ClipboardIcon } from '@navikt/aksel-icons';

export interface KandidatKompetanseProps {
  kompetanse?: KompetanseSchemaDTO[] | null;
}

const KandidatKompetanse: React.FC<KandidatKompetanseProps> = ({
  kompetanse,
}) => {
  if (!kompetanse || kompetanse.length === 0) {
    return null;
  }
  return (
    <GråBoks tittel='Kompetanse' ikon={<ClipboardIcon />}>
      <Erfaring
        beskrivelse={
          kompetanse
            .filter((k) => k.kompKodeNavn)
            .map((k) => k.kompKodeNavn)
            .join(', ')
          // <MangeTekstelementerSeparertMedKomma
          //   elementer={cv.kompetanseObj.map((u) => u.kompKodeNavn)}
          // />
        }
      />
    </GråBoks>
  );
};

export default KandidatKompetanse;
