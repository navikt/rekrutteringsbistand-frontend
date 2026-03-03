export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  const testMode = process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE === 'true';
  const isLocal = process.env.NEXT_PUBLIC_DEVELOPER === 'local';

  if (testMode || isLocal) {
    const { server } = await import('@/mocks/server');
    server.listen({ onUnhandledRequest: 'bypass' });
    console.log('MSW node-server startet');
  }
}
