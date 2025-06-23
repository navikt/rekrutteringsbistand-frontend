import { Modal } from '@navikt/ds-react';
import * as React from 'react';

export type InviterInternalDto = {
  fornavn: string;
  etternavn: string;
  fødselsnummer: string;
};

export interface InviterModalProps {
  modalref?: React.RefObject<HTMLDialogElement | null>;
  inviterInternalDto: InviterInternalDto[];
}

const InviterModal: React.FC<InviterModalProps> = ({
  modalref,
  inviterInternalDto,
}) => {
  const header =
    inviterInternalDto?.length > 1
      ? `Inviter ${inviterInternalDto.length} jobbsøkere til treff`
      : 'Inviter jobbsøkeren til treff';

  return (
    <Modal ref={modalref} header={{ heading: header }}>
      <div>
        {inviterInternalDto.map((jobbsøker) => (
          <div key={jobbsøker.fødselsnummer}>
            {jobbsøker.fornavn} {jobbsøker.etternavn}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default InviterModal;
