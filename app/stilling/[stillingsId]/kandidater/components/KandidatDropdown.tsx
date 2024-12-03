import {
  MenuElipsisHorizontalCircleIcon,
  PencilIcon,
  TrashIcon,
} from '@navikt/aksel-icons';
import { BodyLong, Button, Dropdown, HStack, Modal } from '@navikt/ds-react';
import * as React from 'react';
import { useRef, useState } from 'react';
import { KandidatAPI } from '../../../../api/api-routes';
import { putApi } from '../../../../api/fetcher';
import { kandidaterSchemaDTO } from '../../../../api/kandidat/schema.zod';

export interface KandidatDropdownProps {
  kandidat: kandidaterSchemaDTO;
  kandidatlisteId: string;
}

const KandidatDropdown: React.FC<KandidatDropdownProps> = ({
  kandidat,
  kandidatlisteId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const slettKandidat = async () => {
    setIsLoading(true);
    await putApi(
      `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/kandidater/${kandidat.kandidatnr}/arkivert`,
      {
        method: 'DELETE',
      },
    );
    setIsLoading(false);
    slettModalRef.current?.close();
  };

  const slettModalRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Dropdown defaultOpen={true}>
        <HStack justify='end'>
          <Button
            className='color-gray-500'
            as={Dropdown.Toggle}
            icon={<MenuElipsisHorizontalCircleIcon title='Meny' />}
            size='small'
            variant='tertiary'
          />
        </HStack>
        <Dropdown.Menu>
          <Dropdown.Menu.GroupedList>
            <Dropdown.Menu.GroupedList.Item onClick={() => {}}>
              <PencilIcon title='Rediger' /> Rediger
            </Dropdown.Menu.GroupedList.Item>
            <Dropdown.Menu.GroupedList.Item
              onClick={() => slettModalRef.current?.showModal()}
            >
              <TrashIcon title='Slett' /> Slett
            </Dropdown.Menu.GroupedList.Item>
          </Dropdown.Menu.GroupedList>
        </Dropdown.Menu>
      </Dropdown>

      <Modal
        ref={slettModalRef}
        header={{ heading: 'Bekreft sletting', closeButton: false }}
      >
        <Modal.Body>
          <BodyLong>
            Er du sikker på at du vil slette kandidaten {kandidat.fornavn}{' '}
            {kandidat.etternavn}?
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            loading={isLoading}
            type='button'
            onClick={slettKandidat}
            variant='danger'
          >
            Slett kandidat
          </Button>

          <Button
            disabled={isLoading}
            type='button'
            variant='tertiary'
            onClick={() => slettModalRef.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default KandidatDropdown;
