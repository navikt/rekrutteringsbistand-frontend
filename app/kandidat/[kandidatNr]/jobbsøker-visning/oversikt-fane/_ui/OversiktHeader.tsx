import { useJobbsøkerContext } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import { filtrerbareInnsatsgrupper } from '@/app/kandidat/_ui/innsatsgrupper';
import TekstMedIkon from '@/components/TekstMedIkon';
import { formaterNorskDato } from '@/util/dato';
import {
  CandleIcon,
  EnvelopeClosedIcon,
  HandHeartIcon,
  LocationPinIcon,
  PersonIcon,
  PhoneIcon,
} from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';
import { differenceInYears } from 'date-fns';

export default function OversiktHeader() {
  const { kandidatData } = useJobbsøkerContext();
  return (
    <div>
      <Heading size='medium'>
        {kandidatData.fornavn} {kandidatData.etternavn}
      </Heading>

      <div className='flex flex-wrap gap-4'>
        <TekstMedIkon
          ikon={<CandleIcon />}
          tekst={`Født ${formaterNorskDato({ dato: kandidatData.fodselsdato, visning: 'kortMåned' })} (${kandidatData.fodselsdato && differenceInYears(new Date(), kandidatData.fodselsdato)}år)`}
          subtle={`f.nr. ${kandidatData.fodselsnummer}`}
        />
        <TekstMedIkon
          ikon={<LocationPinIcon />}
          tekst={
            [
              kandidatData.adresselinje1,
              kandidatData.postnummer,
              kandidatData.poststed,
            ]
              .filter(Boolean)
              .join(', ') || null
          }
        />
        <TekstMedIkon
          ikon={<EnvelopeClosedIcon />}
          tekst={kandidatData.epostadresse}
        />
        <TekstMedIkon ikon={<PhoneIcon />} tekst={kandidatData.telefon} />
        <TekstMedIkon
          ikon={<HandHeartIcon />}
          tekst={
            kandidatData.innsatsgruppe
              ? filtrerbareInnsatsgrupper[kandidatData.innsatsgruppe]?.label
              : ''
          }
        />
        <TekstMedIkon
          ikon={<PersonIcon />}
          tekst={`Veileder: ${kandidatData.veilederVisningsnavn || 'Ukjent veileder'} ${kandidatData.veilederIdent ? `(${kandidatData.veilederIdent})` : 'N/A'} ${kandidatData.veilederEpost || ''}`.trim()}
        />
      </div>
    </div>
  );
}
