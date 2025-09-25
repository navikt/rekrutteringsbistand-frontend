import KandidatListeKort from './_ui/Kandidatkort/KandidatlisteKort';
import {
  KandidatlisteSortering,
  useKandidatlisteFilterContext,
} from './_ui/KandidatlisteFilter/KandidatlisteFilterContext';
import KandidatlisteFilterrad from './_ui/KandidatlisteFilter/KandidatlisteFilterrad';
import useFiltrerteKandidater from './_ui/KandidatlisteFilter/useFiltrerteKandidater';
import KandidatlisteHandlingsRad from './_ui/KandidatlisteHandlingsRad';
import SideScroll from '@/components/SideScroll';
import { useKandidatNavigeringContext } from '@/providers/KandidatNavigeringContext';
import { SortDownIcon, SortUpIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useEffect, useRef, type FC } from 'react';

export const KANDIDATLISTE_COLUMN_LAYOUT =
  'grid-cols-1 md:grid-cols-[minmax(10rem,30%)_minmax(6rem,20%)_minmax(10rem,20%)_minmax(5rem,10%)_minmax(10rem,12%)_minmax(1rem,2%)]';

const FiltrertKandidatListeVisning: FC = () => {
  const filtrerteKandidater = useFiltrerteKandidater();
  const { setSortering, sortering } = useKandidatlisteFilterContext();
  const { setKandidatNavigering } = useKandidatNavigeringContext();

  const headerRef = useRef<HTMLDivElement>(null);

  const sortIcon = (asc: boolean, desc: boolean) => {
    if (asc) {
      return <SortDownIcon />;
    }
    if (desc) {
      return <SortUpIcon />;
    }
    return null;
  };

  useEffect(() => {
    if (filtrerteKandidater?.kandidater) {
      setKandidatNavigering(
        filtrerteKandidater.kandidater.map((kandidat) => kandidat.kandidatnr),
      );
    } else {
      setKandidatNavigering([]);
    }
  }, [setKandidatNavigering, filtrerteKandidater?.kandidater]);

  const knappStyling = 'p-0';

  const tableHeader = (
    <div className={`grid ${KANDIDATLISTE_COLUMN_LAYOUT} gap-x-3 px-4`}>
      <div className='flex justify-start'>
        <Button
          iconPosition='right'
          icon={sortIcon(
            sortering === KandidatlisteSortering.NAVN_ASC,
            sortering === KandidatlisteSortering.NAVN_DESC,
          )}
          className={knappStyling}
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
          className={knappStyling}
          variant='tertiary'
          size='small'
          onClick={() => {
            if (sortering === KandidatlisteSortering.LAGT_TIL_ASC)
              setSortering(KandidatlisteSortering.LAGT_TIL_DESC);
            else setSortering(KandidatlisteSortering.LAGT_TIL_ASC);
          }}
        >
          Lagt til
        </Button>
      </div>
      <div className='flex justify-start'>
        <Button
          iconPosition='right'
          icon={sortIcon(
            sortering === KandidatlisteSortering.HENDELSE_ASC,
            sortering === KandidatlisteSortering.HENDELSE_DESC,
          )}
          className={knappStyling}
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
          className={knappStyling}
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
          className={knappStyling}
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
    </div>
  );

  return (
    <div>
      <div ref={headerRef}>
        <KandidatlisteFilterrad />
        <KandidatlisteHandlingsRad />
      </div>
      <SideScroll
        trimHøyde={200}
        enableHorizontalScroll
        excludeRef={[headerRef]}
      >
        <div>
          {tableHeader}
          <div className='grid grid-cols-1 gap-4 p-1'>
            {filtrerteKandidater?.usynligeKandidater?.map((kandidat, index) => (
              <KandidatListeKort usynligKandidat={kandidat} key={index} />
            ))}
            {filtrerteKandidater?.kandidater?.map((kandidat) => (
              <KandidatListeKort
                kandidat={kandidat}
                key={kandidat.kandidatnr}
              />
            ))}
          </div>
        </div>
      </SideScroll>
    </div>
  );
};

export default FiltrertKandidatListeVisning;
