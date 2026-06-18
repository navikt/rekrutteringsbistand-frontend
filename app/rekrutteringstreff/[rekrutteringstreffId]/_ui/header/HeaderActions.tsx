'use client';

import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { useSjekklisteStatus } from '../useSjekklisteStatus';
import KiLoggLenke from './KiLoggLenke';
import AvlysRekrutteringstreffButton from './actions/AvlysRekrutteringstreffButton';
import FullførRekrutteringstreffButton from './actions/FullførRekrutteringstreffButton';
import GjenapneRekrutteringstreffButton from './actions/GjenapneRekrutteringstreffButton';
import OpprettFormidlingFraTreffKnapp from './actions/OpprettFormidlingFraTreffKnapp';
import PubliserRekrutteringstreffButton from './actions/PubliserRekrutteringstreffButton';
import RedigerPublisertButton from './actions/RedigerPublisertButton';
import RepubliserRekrutteringstreffButton from './actions/RepubliserRekrutteringstreffButton';
import SlettRekrutteringstreffButton from './actions/SlettRekrutteringstreffButton';
import { useKanOppretteFormidlingFraTreff } from './useKanOppretteFormidlingFraTreff';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import KopierRekrutteringstreffLenke from '@/app/rekrutteringstreff/_ui/KopierRekrutteringstreffLenke';
import DynamiskDropdown from '@/components/DynamiskDropdown/DynamiskDropdown';
import { useDynamiskDropdown } from '@/components/DynamiskDropdown/useDynamiskDropdown';
import { getMiljø, Miljø } from '@/util/miljø';
import { Button } from '@navikt/ds-react';
import { ImageIcon } from 'lucide-react';
import { FC, ReactNode } from 'react';

type Props = {
  erIForhåndsvisning: boolean;
  viserFullskjermForhåndsvisning?: boolean;
  onToggleForhåndsvisning: (ny: boolean) => void;
  onBekreftRedigerPublisert: () => void;
  onAvbrytRedigering?: () => void;
  onPublisert?: () => void;
};

type Knapp = { id: string; node: ReactNode };

const HeaderActions: FC<Props> = ({
  erIForhåndsvisning,
  viserFullskjermForhåndsvisning,
  onToggleForhåndsvisning,
  onBekreftRedigerPublisert,
  onAvbrytRedigering,
  onPublisert,
}) => {
  const {
    rekrutteringstreffId,
    avlyst,
    harPublisert,
    treff,
    innleggHtmlFraBackend,
    oppdaterData,
  } = useRekrutteringstreffData();
  const { erPubliseringklar } = useSjekklisteStatus();
  const kanOppretteFormidling = useKanOppretteFormidlingFraTreff();
  const erIEditModus = !erIForhåndsvisning;

  const knapper = ((): Knapp[] => {
    // Fullskjerm forhåndsvisning - kun "Avslutt forhåndsvisning"
    if (viserFullskjermForhåndsvisning) {
      return [
        {
          id: 'avslutt-forhandsvisning',
          node: (
            <Button
              type='button'
              size='small'
              variant='secondary'
              onClick={() => onToggleForhåndsvisning(false)}
            >
              Avslutt forhåndsvisning
            </Button>
          ),
        },
      ];
    }

    // Edit-modus etter publisering
    if (
      erIEditModus &&
      harPublisert &&
      !avlyst &&
      treff?.status === RekrutteringstreffStatus.PUBLISERT
    ) {
      return [
        { id: 'kilogg', node: <KiLoggLenke /> },
        {
          id: 'republiser',
          node: (
            <RepubliserRekrutteringstreffButton
              treff={treff}
              innleggHtmlFraBackend={innleggHtmlFraBackend}
            />
          ),
        },
        {
          id: 'forhandsvis',
          node: (
            <Button
              type='button'
              size='small'
              variant='secondary'
              onClick={() => onToggleForhåndsvisning(true)}
            >
              Forhåndsvis
            </Button>
          ),
        },
        {
          id: 'avbryt',
          node: (
            <Button
              type='button'
              size='small'
              variant='tertiary'
              onClick={() => onAvbrytRedigering?.()}
            >
              Avbryt
            </Button>
          ),
        },
      ];
    }

    // Edit-modus før publisering
    if (
      erIEditModus &&
      !harPublisert &&
      treff?.status === RekrutteringstreffStatus.UTKAST
    ) {
      return [
        { id: 'kilogg', node: <KiLoggLenke /> },
        {
          id: 'publiser',
          node: (
            <PubliserRekrutteringstreffButton
              erPubliseringklar={erPubliseringklar}
              rekrutteringstreffId={rekrutteringstreffId}
              oppdaterData={oppdaterData}
              onPublisert={onPublisert}
            />
          ),
        },
        {
          id: 'forhandsvis',
          node: (
            <Button
              type='button'
              size='small'
              variant='secondary'
              onClick={() => onToggleForhåndsvisning(true)}
            >
              Forhåndsvis
            </Button>
          ),
        },
        { id: 'slett', node: <SlettRekrutteringstreffButton /> },
      ];
    }

    // Normal view-modus
    const visRediger =
      !avlyst &&
      harPublisert &&
      treff?.status !== RekrutteringstreffStatus.FULLFØRT;
    const erPublisertOgIkkeAvlyst =
      !avlyst && treff?.status === RekrutteringstreffStatus.PUBLISERT;
    const visFullfør = erPublisertOgIkkeAvlyst;
    const visDelingslenke = erPublisertOgIkkeAvlyst;
    const visForhåndsvisning = erPublisertOgIkkeAvlyst;
    const visGjenåpne = treff?.status === RekrutteringstreffStatus.AVLYST;
    const visAvlys =
      harPublisert &&
      !avlyst &&
      treff?.status !== RekrutteringstreffStatus.FULLFØRT;

    return [
      { id: 'kilogg', node: <KiLoggLenke /> },
      visDelingslenke &&
        treff && {
          id: 'delingslenke',
          node: (
            <KopierRekrutteringstreffLenke rekrutteringstreffData={treff} />
          ),
        },
      harPublisert &&
        kanOppretteFormidling &&
        getMiljø() !== Miljø.ProdGcp && {
          id: 'opprett-formidling',
          node: <OpprettFormidlingFraTreffKnapp key='opprett-formidling' />,
        },
      visForhåndsvisning && {
        id: 'forhandsvis',
        node: (
          <Button
            type='button'
            size='small'
            variant='tertiary'
            icon={<ImageIcon fontSize='1.5rem' />}
            onClick={() => onToggleForhåndsvisning(true)}
          >
            Forhåndsvis
          </Button>
        ),
      },
      visRediger && {
        id: 'rediger',
        node: (
          <RedigerPublisertButton
            erIForhåndsvisning={erIForhåndsvisning}
            harPublisert={harPublisert}
            onToggleForhåndsvisning={onToggleForhåndsvisning}
            onBekreftRedigerPublisert={onBekreftRedigerPublisert}
          />
        ),
      },
      visFullfør && {
        id: 'fullfør',
        node: <FullførRekrutteringstreffButton />,
      },
      visGjenåpne && {
        id: 'gjenapne',
        node: <GjenapneRekrutteringstreffButton />,
      },
      visAvlys && {
        id: 'avlys',
        node: <AvlysRekrutteringstreffButton />,
      },
    ].filter(Boolean) as Knapp[];
  })();

  return <Knapperad knapper={knapper} />;
};

const Knapperad: FC<{ knapper: Knapp[] }> = ({ knapper }) => {
  const { wrapperRef, measureRef, antallSynlige } = useDynamiskDropdown(
    knapper.length,
  );

  const synlige = knapper.slice(0, antallSynlige);
  const skjulte = knapper.slice(antallSynlige);

  return (
    <div ref={wrapperRef} className='flex flex-nowrap items-center gap-2'>
      <div
        ref={measureRef}
        className='pointer-events-none fixed -left-[9999px] flex gap-2'
        aria-hidden='true'
        // inert: Gjør målediven helt usynlig for skjermlesere og Playwright,
        // slik at de kun ser de virkelige, synlige knappene (ikke duplikater)
        inert
      >
        {knapper.map(({ id, node }) => (
          <div key={id} data-measure-item>
            {node}
          </div>
        ))}
      </div>

      {synlige.map(({ id, node }) => (
        <div key={id}>{node}</div>
      ))}

      {skjulte.length > 0 && (
        <DynamiskDropdown>
          {skjulte.map(({ id, node }) => (
            <div key={id}>{node}</div>
          ))}
        </DynamiskDropdown>
      )}
    </div>
  );
};

export default HeaderActions;
