import { logger } from "@navikt/next-logger";
import { getToken, OboResult, requestOboToken } from "@navikt/oasis";
import { NextRequest, NextResponse } from "next/server";

export const proxyWithOBO = async (
  url: string | undefined,
  audience: string,
  req: NextRequest,
) => {
  const token = getToken(req.headers);

  if (!url) {
    return NextResponse.json(
      { beskrivelse: "Ingen url oppgitt for proxy" },
      { status: 500 },
    );
  }
  if (!token) {
    logger.warn("Kunne ikke hente token");
    return NextResponse.json(
      { beskrivelse: "Kunne ikke hente token" },
      { status: 500 },
    );
  }

  let obo: OboResult;
  try {
    obo = await requestOboToken(token, audience);
  } catch (error) {
    logger.error("Feil ved henting av OBO-token:", error);
    return NextResponse.json(
      { beskrivelse: "Kunne ikke hente OBO-token" },
      { status: 500 },
    );
  }

  if (!obo.ok || !obo.token) {
    console.error("Ugyldig OBO-token mottatt:", obo);
    return NextResponse.json(
      { beskrivelse: "Ugyldig OBO-token mottatt" },
      { status: 500 },
    );
  }

  const originalUrl = new URL(req.url);
  const newUrl = `${url}${originalUrl.pathname}${originalUrl.search}`;

  try {
    const originalHeaders = new Headers(req.headers);
    originalHeaders.set("Authorization", `Bearer ${obo.token}`);
    originalHeaders.set("Content-Type", "application/json");

    const fetchOptions: RequestInit = {
      method: req.method,
      headers: originalHeaders,
    };

    if (req.method === "POST" || req.method === "PUT") {
      const body = await new Response(req.body).json();
      if (body) {
        fetchOptions.body = JSON.stringify(body);
      }
    }

    const response = await fetch(newUrl, fetchOptions);

    if (!response.ok) {
      logger.error({
        msg: "HTTP error! Url: " + newUrl + " fra url: " + originalUrl,
        obj: response,
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    logger.error({
      msg:
        "Feil ved proxying av forespørselen til url:" +
        newUrl +
        " fra url: " +
        originalUrl,
      obj: error,
    });
    return NextResponse.json(
      { beskrivelse: error.message || "Feil i proxy" },
      { status: error.status || 500 },
    );
  }
};
