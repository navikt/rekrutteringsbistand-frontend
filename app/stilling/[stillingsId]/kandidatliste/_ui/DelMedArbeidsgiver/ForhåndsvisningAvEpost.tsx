import { ArbeidsgiverNotifikasjonAPI } from '@/app/api/api-routes';
import { useCallback, useEffect, useRef } from 'react';

type Props = {
  opprettetAvNavn: string;
  stillingstittel?: string;
};

const ForhåndsvisningAvEpost = ({
  opprettetAvNavn,
  stillingstittel,
}: Props) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const erstattPlaceholders = useCallback(
    (iframe: HTMLIFrameElement | null) => {
      if (!iframe) return;

      let iframeDocument: Document | null | undefined = null;
      try {
        // Kaster SecurityError hvis cross-origin
        iframeDocument =
          iframe.contentDocument || iframe.contentWindow?.document;
        // Ekstra verifikasjon: tilgang til body trigger også ev. SecurityError
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        iframeDocument?.body;
      } catch {
        // Cross-origin: Kan ikke manipulere innhold
        return;
      }

      if (!iframeDocument) return;

      const tittelElement = iframeDocument.getElementById('tittel');
      const stillingstittelElement =
        iframeDocument.getElementById('stillingstittel');
      const avsenderElement = iframeDocument.getElementById('avsender');

      if (tittelElement)
        tittelElement.textContent = stillingstittel || 'stilling';
      if (stillingstittelElement)
        stillingstittelElement.textContent = stillingstittel || 'stilling';
      if (avsenderElement) avsenderElement.textContent = opprettetAvNavn;
    },
    [opprettetAvNavn, stillingstittel],
  );

  useEffect(() => {
    erstattPlaceholders(iframeRef.current);
  }, [erstattPlaceholders]);

  const handleFerdigLastet = (iframe: HTMLIFrameElement) => {
    iframeRef.current = iframe;
    erstattPlaceholders(iframe);
  };

  const src = `${ArbeidsgiverNotifikasjonAPI.internUrl}/template`;

  return (
    <iframe
      ref={iframeRef}
      title='forhåndsvisning'
      className='border-border-divider h-[30rem] max-h-full w-full rounded-lg border'
      onLoad={(event) => handleFerdigLastet(event.currentTarget)}
      src={src}
    />
  );
};

export default ForhåndsvisningAvEpost;
