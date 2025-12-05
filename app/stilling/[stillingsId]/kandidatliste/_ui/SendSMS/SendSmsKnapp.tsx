import { KandidatListeKandidatDTO } from '@/app/api/kandidat/schema.zod';
import { ArrowForwardIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { FC } from 'react';

export interface SendSmsKnappProps {
  markerteKandidater: KandidatListeKandidatDTO[];
  knappVariant?: 'secondary' | 'tertiary';
  actionMenu?: boolean;
  visSendSmsModal?: (open: boolean) => void;
}

const SendSmsKnapp: FC<SendSmsKnappProps> = ({
  markerteKandidater,
  knappVariant,
  actionMenu,
  visSendSmsModal,
}) => {
  const håndterKnappetrykk = () => {
    if (visSendSmsModal && markerteKandidater.length > 0) {
      visSendSmsModal(true);
    }
  };

  if (actionMenu) {
    return (
      <>
        <ActionMenu.Item
          onSelect={() => {
            håndterKnappetrykk();
          }}
        >
          <ArrowForwardIcon /> Tips om stilling
        </ActionMenu.Item>
      </>
    );
  }
  return (
    <Button
      disabled={markerteKandidater.length === 0}
      onClick={() => håndterKnappetrykk()}
      size={'small'}
      variant={knappVariant || 'secondary'}
      icon={<ArrowForwardIcon title='Tips om stilling' />}
    >
      Tips om stillingen
    </Button>
  );
};
export default SendSmsKnapp;
