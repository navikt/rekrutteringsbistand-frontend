import KandidatListeKort from './_ui/Kandidatkort/KandidatlisteKort';
import {
  KandidatlisteSortering,
  useKandidatlisteFilterContext,
} from './_ui/KandidatlisteFilter/KandidatlisteFilterContext';
import KandidatlisteFilterrad from './_ui/KandidatlisteFilter/KandidatlisteFilterrad';
import useFiltrerteKandidater from './_ui/KandidatlisteFilter/useFiltrerteKandidater';
import KandidatlisteHandlingsRad from './_ui/KandidatlisteHandlingsRad';
import SideScroll from '@/components/SideScroll';
import LitenPaginering from '@/components/paginering/LitenPaginering';
import { useKandidatNavigeringContext } from '@/providers/KandidatNavigeringContext';
import { SortDownIcon, SortUpIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Select } from '@navikt/ds-react';
import { useEffect, useRef } from 'react';

export const KANDIDATLISTE_COLUMN_LAYOUT =
  'grid-cols-1 md:grid-cols-[minmax(10rem,30%)_minmax(6rem,20%)_minmax(10rem,20%)_minmax(5rem,10%)_minmax(10rem,12%)_minmax(1rem,2%)]';

const antallOptions = ['25', '50', '75', '100', '200'];

export interface FiltrertKandidatListeVisningProps {
  kunVisning?: boolean;
}

export default function FiltrertKandidatListeVisning({
  kunVisning,
}: FiltrertKandidatListeVisningProps) {
  const filtrerteKandidater = useFiltrerteKandidater();
  const { setSortering, sortering, side, setSide, visAntall, setVisAntall } =
    useKandidatlisteFilterContext();
  const { setKandidatNavigering } = useKandidatNavigeringContext();

  const totalKandidater = filtrerteKandidater?.totaltAntallKandidater ?? 0;
  const fraAntall = totalKandidater === 0 ? 0 : (side - 1) * visAntall + 1;
  const tilAntall = Math.min(side * visAntall, totalKandidater);

  const paginerteKandidater = filtrerteKandidater?.kandidater;
  const paginerteUsynlige = filtrerteKandidater?.usynligeKandidater;

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
        filtrerteKandidater.kandidater
          .filter((kandidat) => kandidat.fodselsnr !== null)
          .map((kandidat) => kandidat.kandidatnr),
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
      {!kunVisning && (
        <div ref={headerRef}>
          <KandidatlisteFilterrad />
          <div className='flex flex-wrap items-center justify-between gap-2'>
            <KandidatlisteHandlingsRad />
            <div className='flex items-center gap-1'>
              <BodyShort>Antall per side </BodyShort>
              <Select
                className='mr-4'
                size='small'
                hideLabel
                label='Antall per side'
                value={String(visAntall)}
                onChange={(e) => {
                  setVisAntall(Number(e.target.value));
                  setSide(1);
                }}
              >
                {antallOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Select>
              <LitenPaginering
                fraAntall={fraAntall}
                tilAntall={tilAntall}
                total={totalKandidater}
                side={side}
                setSide={setSide}
              />
            </div>
          </div>
        </div>
      )}
      <SideScroll
        enableHorizontalScroll
        lagreScrollNøkkel={`kandidater-${filtrerteKandidater?.kandidater?.length}`}
      >
        <div>
          {tableHeader}
          <div className='grid grid-cols-1 gap-1 p-1'>
            {paginerteUsynlige?.map((kandidat, index) => (
              <KandidatListeKort
                usynligKandidat={kandidat}
                key={index}
                kunVisning={kunVisning}
              />
            ))}
            {paginerteKandidater?.map((kandidat) => (
              <KandidatListeKort
                kandidat={kandidat}
                key={kandidat.kandidatnr}
                kunVisning={kunVisning}
              />
            ))}
          </div>
        </div>
      </SideScroll>
    </div>
  );
}
