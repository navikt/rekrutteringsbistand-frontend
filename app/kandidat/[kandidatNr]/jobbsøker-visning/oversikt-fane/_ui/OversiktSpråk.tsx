import { useJobbsøkerContext } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import Detaljer from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/Detaljer';
import Erfaring from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/Erfaring';
import InfoBoks from '@/components/InfoBoks';
import IkonNavnAvatar from '@/components/ui/IkonNavnAvatar';
import { LanguageIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading } from '@navikt/ds-react';

export enum Språkferdighetsnivå {
  IkkeOppgitt = 'IKKEOPPGITT',
  Nybegynner = 'NYBEGYNNER',
  Godt = 'GODT',
  VeldigGodt = 'VELDIG_GODT',
  Førstespråk = 'FOERSTESPRAAK',
}

const språkferdighetTilVisningsnavn = (ferdighet?: string | null) => {
  switch (ferdighet) {
    case Språkferdighetsnivå.IkkeOppgitt:
      return '-';
    case Språkferdighetsnivå.Nybegynner:
      return 'Nybegynner';
    case Språkferdighetsnivå.Godt:
      return 'Godt';
    case Språkferdighetsnivå.VeldigGodt:
      return 'Veldig godt';
    case Språkferdighetsnivå.Førstespråk:
      return 'Morsmål';
    default:
      return '-';
  }
};

export default function OversiktSpråk() {
  const { kandidatData } = useJobbsøkerContext();

  const språk = kandidatData.sprak;

  return (
    <InfoBoks>
      <div className='flex items-baseline'>
        <IkonNavnAvatar
          ikon={<LanguageIcon />}
          farge={'blå'}
          className={'mr-3'}
        />
        <Heading size='small' className='mb-4'>
          Språk
        </Heading>
      </div>

      {språk?.map((ferdighet, index) => {
        return (
          <Erfaring
            key={index}
            overskrift={ferdighet?.sprakKodeTekst ?? '-'}
            beskrivelse={
              <Detaljer>
                <BodyShort size='small'>
                  Skriftlig:{' '}
                  {språkferdighetTilVisningsnavn(
                    ferdighet?.ferdighetSkriftlig ?? 'IKKE_OPPGITT',
                  )}
                </BodyShort>
                <BodyShort size='small'>
                  Muntlig:{' '}
                  {språkferdighetTilVisningsnavn(
                    ferdighet?.ferdighetMuntlig ?? 'IKKE_OPPGITT',
                  )}
                </BodyShort>
              </Detaljer>
            }
          />
        );
      })}
    </InfoBoks>
  );
}
