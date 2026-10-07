import { ArbeidsgiverNotifikasjonAPI } from '@/app/api/api-routes';
import { useCallback, useEffect, useRef } from 'react';

type Props = {
  opprettetAvNavn: string;
  stillingstittel?: string;
};

const hentDokument = (iframe: HTMLIFrameElement | null): Document | null => {
  if (!iframe) return null;
  try {
    // Kaster SecurityError hvis cross-origin
    const iframeDocument =
      iframe.contentDocument || iframe.contentWindow?.document;
    // Tilgang til body trigger også ev. SecurityError
    return iframeDocument?.body ? iframeDocument : null;
  } catch {
    return null;
  }
};

const tilpassHøyde = (iframe: HTMLIFrameElement, iframeDocument: Document) => {
  iframe.style.height = '0px';
  iframe.style.height = `${iframeDocument.documentElement.scrollHeight}px`;
};

const ForhåndsvisningAvEpost = ({
  opprettetAvNavn,
  stillingstittel,
}: Props) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const erstattPlaceholders = useCallback(
    (iframeDocument: Document | null) => {
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
    erstattPlaceholders(hentDokument(iframeRef.current));
  }, [erstattPlaceholders]);

  useEffect(() => () => observerRef.current?.disconnect(), []);

  const handleFerdigLastet = (iframe: HTMLIFrameElement) => {
    iframeRef.current = iframe;
    const iframeDocument = hentDokument(iframe);
    if (!iframeDocument) return;

    erstattPlaceholders(iframeDocument);
    iframeDocument.documentElement.style.overflow = 'hidden';
    tilpassHøyde(iframe, iframeDocument);

    observerRef.current?.disconnect();
    observerRef.current = new ResizeObserver(() =>
      tilpassHøyde(iframe, iframeDocument),
    );
    observerRef.current.observe(iframeDocument.body);
  };

  const src = `${ArbeidsgiverNotifikasjonAPI.internUrl}/template`;

  return (
    <iframe
      ref={iframeRef}
      title='forhåndsvisning'
      className='border-border-divider block w-full rounded-lg border'
      onLoad={(event) => handleFerdigLastet(event.currentTarget)}
      src={src}
    />
  );
};

export default ForhåndsvisningAvEpost;
