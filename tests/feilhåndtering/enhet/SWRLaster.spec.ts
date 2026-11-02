import SWRLaster from '@/components/SWRLaster';
import Feilmelding from '@/components/feilhåndtering/Feilmelding';
import { expect, test } from '@playwright/test';

test('sender selve chunkfeilen til feilvisningen fra SWR', () => {
  const error = new Error(
    'Failed to load chunk /_next/static/chunks/1pstezan3liz3.js from module 242581',
  );
  const laster = SWRLaster({ hooks: [], children: () => null });
  if (
    !laster ||
    typeof laster.props !== 'object' ||
    laster.props === null ||
    !('renderFeil' in laster.props) ||
    typeof laster.props.renderFeil !== 'function'
  ) {
    throw new Error('Mangler SWR-laster');
  }
  const feilmelding = laster.props.renderFeil(error);

  expect(feilmelding).toMatchObject({
    type: Feilmelding,
    props: { error, message: 'Feil ved henting av data' },
  });
});
