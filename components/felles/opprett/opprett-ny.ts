import {
  opprettNyStilling,
  OpprettStillingProps,
} from '@/app/api/stilling/ny-stilling/opprettNyStilling';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { UmamiEvent, UmamiEventObject } from '@/components/umami/umamiEvents';
import { RekbisError } from '@/util/rekbisError';

async function opprettNy(props: OpprettStillingProps): Promise<string> {
  try {
    const response = await opprettNyStilling(props);
    const uuid = response?.stilling?.uuid;
    if (uuid) {
      return uuid;
    } else {
      throw new RekbisError({
        message: 'Manglende uuid ved opprettelse av ' + props.kategori,
        error: response,
      });
    }
  } catch (error) {
    throw new RekbisError({
      message: 'Feil ved opprettelse av ' + props.kategori,
      error,
    });
  }
}

export async function opprettOgNaviger(
  props: OpprettStillingProps,
  trackAndNavigate: (event: UmamiEventObject, url: string) => void,
) {
  const uuid = await opprettNy(props);
  if (
    props.kategori === Stillingskategori.Stilling ||
    props.kategori === Stillingskategori.Jobbmesse
  ) {
    trackAndNavigate(
      UmamiEvent.Sidebar.opprettet_stilling,
      `/stilling/${uuid}/rediger`,
    );
  } else if (props.kategori === Stillingskategori.Formidling) {
    trackAndNavigate(
      UmamiEvent.Sidebar.opprettet_etterregistrering,
      `/etterregistrering/${uuid}/rediger`,
    );
  }
}
