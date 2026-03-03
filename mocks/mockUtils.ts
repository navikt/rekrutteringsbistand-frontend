import { http } from 'msw';

export const getMock: typeof http.get = (path, ...args) =>
  http.get(`*${path}`, ...args);

export const postMock: typeof http.post = (path, ...args) =>
  http.post(`*${path}`, ...args);

export const putMock: typeof http.put = (path, ...args) =>
  http.put(`*${path}`, ...args);

export const deleteMock: typeof http.delete = (path, ...args) =>
  http.delete(`*${path}`, ...args);
