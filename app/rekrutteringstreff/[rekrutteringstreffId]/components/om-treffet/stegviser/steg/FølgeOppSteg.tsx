import { useStegviser } from '../StegviserContext';
import {
  SjekklisteContainer,
  SjekklisteInfoRad,
  SjekklisteRad,
  SjekklisteSeparator,
} from './Sjekkliste';
import { BodyShort, Detail } from '@navikt/ds-react';

const FølgeOppSteg = () => {
  const { arrangementtidspunktHarPassert, antallMøttOpp } = useStegviser();

  return (
    <div className='flex-1'>
      <Detail spacing>
        Her kan du følge opp påmeldte og gjennomføre treffet.
      </Detail>
      <SjekklisteContainer>
        <SjekklisteSeparator />
        <SjekklisteRad
          erOppfylt={arrangementtidspunktHarPassert}
          kanKlikkes={false}
          onClick={() => {}}
          label='Arrangementets tiltidspunkt har passert'
          ariaLabel='Arrangementets tiltidspunkt har passert'
        />
        <SjekklisteSeparator />
        <SjekklisteInfoRad>
          <BodyShort>
            Antall møtt opp: <b>{antallMøttOpp}</b>
          </BodyShort>
        </SjekklisteInfoRad>
      </SjekklisteContainer>
    </div>
  );
};

export default FølgeOppSteg;
