import * as React from 'react';

export interface KandidatAktivitetProps {
  children?: React.ReactNode | undefined;
}

const KandidatAktivitet: React.FC<KandidatAktivitetProps> = ({ children }) => {
  return <React.Fragment> Hello Wiklem </React.Fragment>;
};

export default KandidatAktivitet;
