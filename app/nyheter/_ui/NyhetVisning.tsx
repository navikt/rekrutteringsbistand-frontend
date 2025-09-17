import {
  NyheterDTO,
  slettNyhet,
} from '@/app/api/bruker/nyheter/[...slug]/nyhet-admin';
import EndreNyhetModal from '@/app/nyheter/_ui/EndreNyhetModal';
import VisEditorTekst from '@/components/felles/rikteksteditor/VisEditorTekst';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { formaterNorskDato } from '@/util/util';
import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button } from '@navikt/ds-react';
import { useState } from 'react';

export interface NyhetVisningProps {
  nyhet: NyheterDTO;
  refetch: () => void;
}

export default function NyhetVisning({ nyhet, refetch }: NyhetVisningProps) {
  const [loading, setLoading] = useState(false);

  const onSlettNyhet = async () => {
    setLoading(true);
    await slettNyhet(nyhet.nyhetId);
    refetch();
    setLoading(false);
  };
  return (
    <Box.New
      className='@container/kandidatlistekort mb-4 flex flex-col p-4 min-w-fit'
      background='neutral-softA'
      borderRadius='xlarge'
      data-testid='stillings-kort'
    >
      <div className='flex justify-between'>
        <div>
          <h1 className='text-2xl font-bold flex gap-2'>{nyhet.tittel}</h1>
          <BodyShort>
            {formaterNorskDato({ dato: nyhet.opprettetDato })}
          </BodyShort>
        </div>
        <div>
          <TilgangskontrollForInnhold
            skjulVarsel
            kreverEnAvRollene={[Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]}
          >
            <EndreNyhetModal eksisterendeNyhet={nyhet} refetch={refetch} />
            <Button
              variant='tertiary'
              icon={<TrashIcon />}
              onClick={onSlettNyhet}
              loading={loading}
            >
              Slett
            </Button>
          </TilgangskontrollForInnhold>
        </div>
      </div>

      <div className='my-8'>
        <VisEditorTekst htmlTekst={nyhet.innhold} />
      </div>
    </Box.New>
  );
}
