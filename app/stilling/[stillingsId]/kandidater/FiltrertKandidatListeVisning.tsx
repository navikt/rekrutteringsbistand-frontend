import KandidatListeKort from './components/Kandidatkort/KandidatlisteKort';
import {
  KandidatlisteSortering,
  useKandidatlisteFilterContext,
} from './components/KandidatlisteFilter/KandidatlisteFilterContext';
import KandidatlisteFilterrad from './components/KandidatlisteFilter/KandidatlisteFilterrad';
import useFiltrerteKandidater from './components/KandidatlisteFilter/useFiltrerteKandidater';
import KandidatlisteHandlingsRad from './components/KandidatlisteHandlingsRad';
import { SortDownIcon, SortUpIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

export const KANDIDATLISTE_COLUMN_LAYOUT =
  'grid-cols-1 md:grid-cols-[20rem_repeat(4,minmax(6rem,1fr))_5rem]';

export interface FiltrertKandidatListeProps {
  children?: React.ReactNode | undefined;
}

const FiltrertKandidatListeVisning: React.FC<FiltrertKandidatListeProps> = ({
  children,
}) => {
  const filtrerteKandidater = useFiltrerteKandidater();
  const { setSortering, sortering } = useKandidatlisteFilterContext();

  const sortIcon = (asc: boolean, desc: boolean) => {
    if (asc) {
      return <SortDownIcon />;
    }
    if (desc) {
      return <SortUpIcon />;
    }
    return null;
  };
  console.log(
    '🎺 filtrerteKandidater?.kandidater',
    filtrerteKandidater?.kandidater,
  );
  return (
    <div className='mt-6'>
      <KandidatlisteFilterrad />
      <div className='mt-4' />
      <KandidatlisteHandlingsRad />
      <div className='mt-4' />
      <div className='grid grid-cols-1 gap-4'>
        <div className={`grid ${KANDIDATLISTE_COLUMN_LAYOUT} gap-x-3 px-4`}>
          <div className='flex justify-start'>
            <Button
              iconPosition='right'
              icon={sortIcon(
                sortering === KandidatlisteSortering.NAVN_ASC,
                sortering === KandidatlisteSortering.NAVN_DESC,
              )}
              className=''
              variant='tertiary'
              size='small'
              onClick={() => {
                if (sortering === KandidatlisteSortering.NAVN_ASC)
                  setSortering(KandidatlisteSortering.NAVN_DESC);
                else setSortering(KandidatlisteSortering.NAVN_ASC);
              }}
            >
              Navn
            </Button>
          </div>
          <div className='flex justify-start'>
            <Button
              iconPosition='right'
              icon={sortIcon(
                sortering === KandidatlisteSortering.LAGT_TIL_ASC,
                sortering === KandidatlisteSortering.LAGT_TIL_DESC,
              )}
              className=''
              variant='tertiary'
              size='small'
              onClick={() => {
                if (sortering === KandidatlisteSortering.LAGT_TIL_ASC)
                  setSortering(KandidatlisteSortering.LAGT_TIL_DESC);
                else setSortering(KandidatlisteSortering.LAGT_TIL_ASC);
              }}
            >
              Lagt til av
            </Button>
          </div>
          <div className='flex justify-start'>
            <Button
              iconPosition='right'
              icon={sortIcon(
                sortering === KandidatlisteSortering.HENDELSE_ASC,
                sortering === KandidatlisteSortering.HENDELSE_DESC,
              )}
              className=''
              variant='tertiary'
              size='small'
              onClick={() => {
                if (sortering === KandidatlisteSortering.HENDELSE_ASC)
                  setSortering(KandidatlisteSortering.HENDELSE_DESC);
                else setSortering(KandidatlisteSortering.HENDELSE_ASC);
              }}
            >
              Siste hendelse
            </Button>
          </div>
          <div className='flex justify-start'>
            <Button
              iconPosition='right'
              icon={sortIcon(
                sortering === KandidatlisteSortering.VARSEL_ASC,
                sortering === KandidatlisteSortering.VARSEL_DESC,
              )}
              className=''
              variant='tertiary'
              size='small'
              onClick={() => {
                if (sortering === KandidatlisteSortering.VARSEL_ASC)
                  setSortering(KandidatlisteSortering.VARSEL_DESC);
                else setSortering(KandidatlisteSortering.VARSEL_ASC);
              }}
            >
              Varsler
            </Button>
          </div>
          <div className='flex justify-start'>
            <Button
              iconPosition='right'
              icon={sortIcon(
                sortering === KandidatlisteSortering.INTERN_STATUS_ASC,
                sortering === KandidatlisteSortering.INTERN_STATUS_DESC,
              )}
              className=''
              variant='tertiary'
              size='small'
              onClick={() => {
                if (sortering === KandidatlisteSortering.INTERN_STATUS_ASC)
                  setSortering(KandidatlisteSortering.INTERN_STATUS_DESC);
                else setSortering(KandidatlisteSortering.INTERN_STATUS_ASC);
              }}
            >
              Intern status
            </Button>
          </div>
          <div></div>
        </div>
        {filtrerteKandidater?.usynligeKandidater?.map((kandidat, index) => (
          <KandidatListeKort usynligKandidat={kandidat} key={index} />
        ))}
        {filtrerteKandidater?.kandidater?.map((kandidat, index) => (
          <KandidatListeKort kandidat={kandidat} key={index} />
        ))}
      </div>
    </div>
  );
};

export default FiltrertKandidatListeVisning;
