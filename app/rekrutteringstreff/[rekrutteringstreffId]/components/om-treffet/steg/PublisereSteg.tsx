import { ChecklistItem } from './TreffSteg';
import { CheckmarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Detail, Loader } from '@navikt/ds-react';
import * as React from 'react';

interface Props {
  sjekklisteData: ChecklistItem[];
  checkedItems: Record<string, boolean>;
  handleClickSjekklisteItem: (id: string) => void;
  loading: boolean;
}

const PublisereSteg: React.FC<Props> = ({
  sjekklisteData,
  checkedItems,
  handleClickSjekklisteItem,
  loading,
}) => {
  return (
    <div className='flex-1'>
      <Detail spacing>
        Før treffet er tilgjengelig for andre, og du kan invitere jobbsøker må
        noen detaljer være på plass først:
      </Detail>

      {loading && <Loader size='medium' title='Laster sjekkliste status...' />}

      {!loading && (
        <div className='space-y-0'>
          {sjekklisteData.map((item) => {
            const erOppfylt = !!checkedItems[item.id];
            const kanKlikkes = !erOppfylt;
            const visRamme =
              item.id === 'arbeidsgiver' || item.id === 'svarfrist';
            return (
              <React.Fragment key={item.id}>
                <div
                  onClick={() =>
                    kanKlikkes && handleClickSjekklisteItem(item.id)
                  }
                  onKeyDown={(e) => {
                    if (kanKlikkes && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleClickSjekklisteItem(item.id);
                    }
                  }}
                  className={`flex items-center justify-between my-4 ${
                    kanKlikkes
                      ? 'cursor-pointer hover:bg-[var(--ax-bg-neutral-moderate-hover)] rounded'
                      : ''
                  }`}
                  role={kanKlikkes ? 'button' : undefined}
                  tabIndex={kanKlikkes ? 0 : undefined}
                  aria-label={
                    kanKlikkes
                      ? `Legg til eller rediger ${item.label}`
                      : `${item.label} - Oppfylt`
                  }
                >
                  <div className='flex items-center gap-2'>
                    <div className='w-5 h-5 border-2 rounded-full flex items-center justify-center border-blue-400 text-blue-400'>
                      {erOppfylt && <CheckmarkIcon fontSize='1rem' />}
                    </div>
                    <BodyShort>{item.label}</BodyShort>
                  </div>
                  {kanKlikkes && (
                    <BodyShort className='text-blue-400 px-1'>
                      Legg til
                    </BodyShort>
                  )}
                </div>
                {visRamme && (
                  <div className='border-b border-border-subtle my-4'></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PublisereSteg;
