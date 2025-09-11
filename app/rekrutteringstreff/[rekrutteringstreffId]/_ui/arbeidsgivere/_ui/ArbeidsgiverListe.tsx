'use client';

import ArbeidsgiverKort, { ArbeidsgiverAdresse } from './ArbeidsgiverKort';
import ArbeidsgiverListeItem from './ArbeidsgiverListeItem';
import * as React from 'react';

export interface ArbeidsgiverVisningItem {
  navn: string;
  orgnr: string;
  adresse?: ArbeidsgiverAdresse | null;
  status?: string;
}

interface Props {
  items: ArbeidsgiverVisningItem[];
  /**
   * If true, we will render each item using ArbeidsgiverListeItem to also look up address from PAM based on orgnr.
   * Use this when items are coming from backend (treff-arbeidsgiver) and you don't have adresse inline.
   */
  usePamLookup?: boolean;
  /** Render action node (e.g. X/Slett) for a given item */
  actionFactory?: (item: ArbeidsgiverVisningItem) => React.ReactNode;
  emptyText?: string;
}

const ArbeidsgiverListe: React.FC<Props> = ({
  items,
  usePamLookup = false,
  actionFactory,
  emptyText = 'Ingen arbeidsgivere valgt ennå',
}) => {
  if (!items || items.length === 0) {
    return <p className='text-sm text-gray-600'>{emptyText}</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.orgnr}>
          {usePamLookup ? (
            // Backend entries: fetch address via PAM and render ArbeidsgiverKort via ArbeidsgiverListeItem
            <ArbeidsgiverListeItem
              arbeidsgiver={
                {
                  navn: item.navn,
                  organisasjonsnummer: item.orgnr,
                  hendelser: [],
                  status: item.status,
                } as any
              }
              status={item.status}
              actionSlot={actionFactory?.(item)}
            />
          ) : (
            // Pending entries or entries with known address: render directly
            <ArbeidsgiverKort
              navn={item.navn}
              organisasjonsnummer={item.orgnr}
              adresse={item.adresse}
              status={item.status}
              actionSlot={actionFactory?.(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default ArbeidsgiverListe;
