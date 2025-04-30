import LagreIKandidatliste from './LagreIKandidatliste';
import { KandidatsokKandidat } from '@/app/api/kandidat-sok/useKandidatsøk';
import LagreIRekrutteringstreff from '@/app/rekrutteringstreff/[rekrutteringstreffId]/components/LagreIRekrutteringstreff';
import { ChevronDownIcon, PersonPlusIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import React from 'react';

// ...andre imports...

const LagreKandidatActionMenu = ({
  stillingsId,
  rekrutteringstreffId,
  kandidatsokKandidater,
}: {
  stillingsId?: string;
  rekrutteringstreffId?: string;
  kandidatsokKandidater: KandidatsokKandidat[];
}) => {
  const refKandidatliste = React.useRef<HTMLButtonElement>(null);
  const refRekrutteringstreff = React.useRef<HTMLButtonElement>(null);

  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          variant='secondary-neutral'
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition='right'
        >
          Lagre kandidater
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Item
          onSelect={() => refKandidatliste.current?.click()}
          icon={<PersonPlusIcon aria-hidden />}
        >
          Lagre i kandidatliste
        </ActionMenu.Item>
        <ActionMenu.Item
          onSelect={() => refRekrutteringstreff.current?.click()}
          icon={<PersonPlusIcon aria-hidden />}
        >
          Lagre i rekrutteringstreff
        </ActionMenu.Item>
      </ActionMenu.Content>
      <span style={{ display: 'none' }}>
        <LagreIKandidatliste stillingsId={stillingsId} ref={refKandidatliste} />
        <LagreIRekrutteringstreff
          rekrutteringstreffId={rekrutteringstreffId}
          kandidatsokKandidater={kandidatsokKandidater}
          ref={refRekrutteringstreff}
        />
      </span>
    </ActionMenu>
  );
};

export default LagreKandidatActionMenu;
