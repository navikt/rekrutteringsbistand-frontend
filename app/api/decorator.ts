import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers, body } = req;

  const url = 'https://modiacontextholder.intern.dev.nav.no/api/decorator';

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: headers['authorization'] || '',
        'Content-Type': headers['content-type'] || 'application/json',
      },
      body:
        method !== 'GET' && method !== 'HEAD'
          ? JSON.stringify(body)
          : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error in proxying request:', error);
    res.status(500).json({
      error: 'An error occurred while processing the request',
    });
  }
}
