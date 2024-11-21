import { Navigeringsmeny } from './components/navigasjon/Navigasjon';

import { isLocal } from '../../../util/env';
import DevDekoratør from '../dev/DevDekoratør';
import Modiadekoratør from './components/modia/Modiadekoratør';

const Header: React.FC = () => {
  return (
    <>
      {isLocal ? <DevDekoratør /> : <Modiadekoratør />}
      <Navigeringsmeny />
    </>
  );
};

export default Header;
