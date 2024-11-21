import { Navigeringsmeny } from './components/navigasjon/Navigasjon';

import Modiadekoratør from './components/modia/Modiadekoratør';

const Header: React.FC = () => {
  return (
    <>
      {/* {isLocal ? <DevDekoratør /> : <Modiadekoratør />} */}
      <Modiadekoratør />
      <Navigeringsmeny />
    </>
  );
};

export default Header;
