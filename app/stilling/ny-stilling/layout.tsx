import { BodyLong } from '@navikt/ds-react';

import { Alert } from '@navikt/ds-react';
import SideLayout from '../../components/layout/SideLayout';
import SideTopBanner from '../../components/layout/SideTopBanner';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SideLayout banner={<SideTopBanner tittel='Opprett ny stilling' />}>
      <div>
        <Alert className='mb-2' variant='warning'>
          <BodyLong spacing>
            Du kan ikke registrere Nav-kurs, webinar, arbeidstrening og
            lignende. Det er kun kategoriene nedenfor som skal brukes.
          </BodyLong>
          <BodyLong>
            Du kan ikke endre stillingskategori eller arbeidsgiver etter
            stillingen er opprettet.
          </BodyLong>
        </Alert>
        {children}
      </div>
    </SideLayout>
  );
}
