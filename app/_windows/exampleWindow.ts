'use client';

import { UrlWindowConfig } from './useUrlWindow';
import React from 'react';

/**
 * Eksempel på hvordan man legger til et nytt URL-vindu.
 * Kopier denne filen og endre konfigurasjonen for ditt vindu.
 */
export const exampleWindowConfig: UrlWindowConfig = {
  urlParam: 'visEksempel', // URL parameter navn
  windowId: 'eksempelWindow', // Unik ID for vinduet
  title: 'Eksempel vindu', // Tittel som vises i vinduet
  createContent: (paramValue: string) => {
    // Her kan du lage innholdet basert på parameter-verdien
    return React.createElement(
      'div',
      {
        className: 'p-4',
        key: `eksempel-${paramValue}-${Date.now()}`,
      },
      `Eksempel vindu med verdi: ${paramValue}`,
    );
  },
  onClose: () => {
    // Valgfri: Custom logikk når vinduet lukkes
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('Eksempel vindu ble lukket');
    }
  },
};
