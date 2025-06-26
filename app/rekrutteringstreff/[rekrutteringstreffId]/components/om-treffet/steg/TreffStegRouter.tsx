import ArrangereSteg from './ArrangereSteg';
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
        />
      );
    case 3:
      return <ArrangereSteg />;
    case 4:
      return <FølgeOppSteg />;
    case 5:
      return <AvslutteSteg harAvsluttet={props.harAvsluttet} />;
    default:
      return null;
  }
};

export default TreffStegRouter;
