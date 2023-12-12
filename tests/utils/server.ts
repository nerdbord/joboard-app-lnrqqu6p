import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import data from '../data/offers.json';

export const server = setupServer(
   http.get('https://training.nerdbord.io/api/v1/joboard/offers*', () => {
      return HttpResponse.json(data);
   }),
);
