'use client';

import { useThemeProvider } from '../providers/ThemeProvider';
import Image from 'next/image';
import * as React from 'react';

export interface SVGDarkmodeProps {
  src?: string;
  alt?: string;
}

const SVGDarkmode: React.FC<SVGDarkmodeProps> = ({ src, alt = 'bilde' }) => {
  const { darkMode } = useThemeProvider();
  if (!src) {
    return null;
  }
  const darkModeClass = darkMode ? 'dark:invert dark:brightness-90' : '';
  return <Image src={src} alt={alt} className={darkModeClass} />;
};

export default SVGDarkmode;
