interface IeierStilling {
  stillingsData?: any;
  navIdent?: string;
}

export const eierStilling = ({ stillingsData, navIdent }: IeierStilling) => {
  if (!navIdent) {
    return false;
  }
  if (
    stillingsData &&
    'administration' in stillingsData &&
    stillingsData?.administration?.navIdent === navIdent
  ) {
    return true;
  } else if (
    stillingsData &&
    'eierNavident' in stillingsData &&
    stillingsData?.eierNavident === navIdent
  ) {
    return true;
  }
  //TODO Implementer hvis erUtivkler
  return false;
};
