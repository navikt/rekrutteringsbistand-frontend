import Image from 'next/image';
import * as React from 'react';
import { useApplikasjonContext } from '../ApplikasjonContext';

export interface SVGDarkmodeProps {
  src?: string;
  alt?: string;
}

const SVGDarkmode: React.FC<SVGDarkmodeProps> = ({ src, alt = 'bilde' }) => {
  const { darkMode } = useApplikasjonContext();
  if (!src) {
    return null;
  }
  const darkModeClass = darkMode ? 'dark:invert dark:brightness-90' : '';
  return <Image src={src} alt={alt} className={darkModeClass} />;
};

export default SVGDarkmode;
