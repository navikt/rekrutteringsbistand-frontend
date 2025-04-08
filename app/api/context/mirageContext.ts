export const mirageContext = (server: any) =>
  server.post('/api/context', () => {
    return {
      status: 200,
      message: 'OK',
    };
  });
