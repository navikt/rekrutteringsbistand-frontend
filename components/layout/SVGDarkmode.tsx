'use client';

import { useThemeProvider } from '@/providers/ThemeProvider';
import Image from 'next/image';
import * as React from 'react';

export interface SVGDarkmodeProps {
  light?: string;
  dark?: string;
  src?: string;
  alt?: string;
}

const SVGDarkmode: React.FC<SVGDarkmodeProps> = ({
  src,
  light,
  dark,
  alt = 'pictogram',
}) => {
  const { darkMode } = useThemeProvider();

  if (darkMode && dark) {
    return <Image src={dark} alt={alt} />;
  } else if (light) {
    return <Image src={light} alt={alt} />;
  } else if (src) {
    const darkModeClass = darkMode ? 'dark:invert dark:brightness-90' : '';
    return <Image src={src} alt={alt} className={darkModeClass} />;
  }
  return null;
};

export default SVGDarkmode;
