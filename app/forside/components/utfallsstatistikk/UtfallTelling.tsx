import { BodyShort, Skeleton } from '@navikt/ds-react';

interface IUtfalltelling {
  tall?: number;
  beskrivelse: string;
  ikon?: React.ReactNode;
  detaljer?: React.ReactNode;
}

const Utfalltelling: React.FC<IUtfalltelling> = ({
  tall,
  beskrivelse,
  ikon,
  detaljer = null,
}) => {
  return (
    <div>
      <div>
        <BodyShort>{beskrivelse}</BodyShort>
        <span>{tall ?? <Skeleton width={40} />}</span>
        {detaljer}
      </div>
      <div>{ikon}</div>
    </div>
  );
};

export default Utfalltelling;
