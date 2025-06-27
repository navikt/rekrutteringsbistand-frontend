// filepath: /Users/joaraurdal/ws/nav/rekrutteringsbistand-frontend/app/rekrutteringstreff/[rekrutteringstreffId]/components/om-treffet/steg/TreffStegRouter.tsx
import AvslutteSteg from './AvslutteSteg';
import FølgeOppSteg from './FølgeOppSteg';
import InvitereSteg from './InvitereSteg';
import PublisereSteg from './PublisereSteg';
import { ChecklistItem } from './TreffSteg';
import * as React from 'react';

interface Props {
  activeStep: number;
  sjekklisteData: ChecklistItem[];
  checkedItems: Record<string, boolean>;
  handleClickSjekklisteItem: (id: string) => void;
  loading: boolean;
  harInvitert: boolean;
  antallInviterte: number;
  onInviteClick: () => void;
  harAvsluttet: boolean;
  erDatoPassert: boolean;
}

const TreffStegRouter: React.FC<Props> = ({ activeStep, ...props }) => {
  switch (activeStep) {
    case 1:
      return (
        <PublisereSteg
          sjekklisteData={props.sjekklisteData}
          checkedItems={props.checkedItems}
          handleClickSjekklisteItem={props.handleClickSjekklisteItem}
          loading={props.loading}
        />
      );
    case 2:
      return (
        <InvitereSteg
          harInvitert={props.harInvitert}
          antallInviterte={props.antallInviterte}
          onInviteClick={props.onInviteClick}
          erDatoPassert={props.erDatoPassert}
        />
      );
    case 3:
      return <FølgeOppSteg />;
    case 4:
      return <AvslutteSteg harAvsluttet={props.harAvsluttet} />;
    default:
      return null;
  }
};

export default TreffStegRouter;
