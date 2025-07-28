import * as React from 'react';

export interface VisPersonProps {
  personTreffId?: string;
}

const VisPerson: React.FC<VisPersonProps> = ({ personTreffId }) => {
  return <React.Fragment> Viser id: {personTreffId} </React.Fragment>;
};

export default VisPerson;
