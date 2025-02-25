import { useCallback, useEffect, useRef } from 'react';
import { ArbeidsgiverNotifikasjonAPI } from '../../../../../api/api-routes';

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
      if (iframe) {
        const iframeDocument = iframe.contentWindow?.document;

        const tittelElement = iframeDocument?.getElementById('tittel');
        const stillingstittelElement =
          iframeDocument?.getElementById('stillingstittel');
        //TODO Tekst er vel ikke lengre i bruk?
        // const tekstElement = iframeDocument?.getElementById('tekst');
        const avsenderElement = iframeDocument?.getElementById('avsender');

        if (tittelElement)
          tittelElement.innerText = stillingstittel || 'stilling';
        if (stillingstittelElement)
          stillingstittelElement.innerText = stillingstittel || 'stilling';
        if (avsenderElement) avsenderElement.innerHTML = opprettetAvNavn;
      }
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

  return (
    <iframe
      title='forhåndsvisning'
      className={` w-full h-[30rem] max-h-full border border-border-divider rounded-lg`}
      onLoad={(event) => handleFerdigLastet(event.currentTarget)}
      src={`${ArbeidsgiverNotifikasjonAPI.internUrl}/template`}
    />
  );
};

export default ForhåndsvisningAvEpost;
