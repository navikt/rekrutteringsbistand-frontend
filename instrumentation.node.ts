export async function register() {
  const testMode = process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE === 'true';

  if (testMode) {
    const { server } = await import('@/mocks/server');
    server.listen({
      onUnhandledRequest: (req, print) => {
        try {
          const url = new URL(req.url);
          if (url.pathname === '/api' || url.pathname.startsWith('/api/')) {
            print.warning();
          }
        } catch {
          // bypass
        }
      },
    });
    console.log('MSW node server startet via instrumentation');
  }
}
