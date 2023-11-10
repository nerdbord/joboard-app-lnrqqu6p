import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import App from '../src/App';
import data from './data/offers.json';
import { testFilterCheckBoxes, getOffersData } from './utils/helpers';

const server = setupServer(
   http.get('https://training.nerdbord.io/api/v1/joboard/offers*', () => {
      return HttpResponse.json(data);
   }),
);

describe('Test job offers filters', () => {
   beforeAll(() => server.listen());
   afterEach(() => server.resetHandlers());
   afterAll(() => server.close());

   it('Test filtering by job type', async () => {
      render(<App />);
      // Wait for offers to be available
      await waitFor(() => {
         expect(screen.getByTestId('jobs-container')).toBeInTheDocument();
      });

      // Check if offers are displayed
      expect((await getOffersData()).length).toBeGreaterThan(0);
      // Test filters functionality
      await testFilterCheckBoxes('filter-job-type');
   });

   it('Test filtering by seniority', async () => {
      render(<App />);
      // Wait for offers to be available
      await waitFor(() => {
         expect(screen.getByTestId('jobs-container')).toBeInTheDocument();
      });

      // Check if offers are displayed
      expect((await getOffersData()).length).toBeGreaterThan(0);
      // Test filters functionality
      await testFilterCheckBoxes('filter-seniority');
   });

   it('Test filtering by location', async () => {
      render(<App />);
      // Wait for offers to be available
      await waitFor(() => {
         expect(screen.getByTestId('jobs-container')).toBeInTheDocument();
      });

      // Check if offers are displayed
      expect((await getOffersData()).length).toBeGreaterThan(0);
      // Test filters functionality
      await testFilterCheckBoxes('filter-location');
   });
});
