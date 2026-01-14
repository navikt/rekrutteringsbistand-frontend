import { KandidatListeKandidatDTO } from '@/app/api/kandidat/schema.zod';
import { ArrowForwardIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { FC } from 'react';

export interface SendSmsKnappProps {
  markerteKandidater: KandidatListeKandidatDTO[];
  knappVariant?: 'secondary' | 'tertiary';
  actionMenu?: boolean;
  setVisSendSmsModal?: (open: boolean) => void;
}

const SendSmsKnapp: FC<SendSmsKnappProps> = ({
  markerteKandidater,
  knappVariant,
  actionMenu,
  setVisSendSmsModal,
}) => {
  const håndterKnappetrykk = () => {
    if (setVisSendSmsModal && markerteKandidater.length > 0) {
      setVisSendSmsModal(true);
    }
  };

  if (actionMenu) {
    return (
      <ActionMenu.Item onSelect={håndterKnappetrykk}>
        <ArrowForwardIcon /> Tips om stilling
      </ActionMenu.Item>
    );
  }
  return (
    <Button
      disabled={markerteKandidater.length === 0}
      onClick={håndterKnappetrykk}
      size={'xsmall'}
      variant={knappVariant || 'tertiary'}
      icon={<ArrowForwardIcon title='Tips om stilling' />}
      iconPosition='left'
    >
      <span className='hidden lg:inline'>Send tips</span>
    </Button>
  );
};
export default SendSmsKnapp;
