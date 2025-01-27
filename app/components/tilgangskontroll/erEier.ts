interface IeierStilling {
  stillingsData?: any;
  navIdent?: string;
}

export const eierStilling = ({ stillingsData, navIdent }: IeierStilling) => {
  if (!navIdent) {
    return false;
  }
  if (stillingsData?.administration?.navIdent === navIdent) {
    return true;
  }
  if (stillingsData?.stilling?.administration?.navIdent === navIdent) {
    return true;
  }

  if (stillingsData?.eierNavident === navIdent) {
    return true;
  }
  if (stillingsData?.stillingsinfo?.eierNavident === navIdent) {
    return true;
  }

  return false;
};
