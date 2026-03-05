import { ArbeidsgiverNotifikasjonAPI } from '@/app/api/api-routes';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const templateHtml = `<!DOCTYPE html>
<html lang="no">
<head><meta charset="UTF-8"><title>Forhåndsvisning</title></head>
<body>
  <h1 id="tittel">stillingstittel</h1>
  <p>Hei, du har fått en melding om stilling <span id="stillingstittel">stillingstittel</span>.</p>
  <p>Hilsen <span id="avsender">avsender</span></p>
</body>
</html>`;

export const arbeidsgiverNotifikasjonTemplateMSWHandler = getMock(
  `${ArbeidsgiverNotifikasjonAPI.internUrl}/template`,
  () => {
    return new HttpResponse(templateHtml, {
      headers: { 'Content-Type': 'text/html' },
    });
  },
);
