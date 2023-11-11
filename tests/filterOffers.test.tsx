import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { it, expect } from 'vitest';
import App from '../src/App';
import userEvent from '@testing-library/user-event';
import {
   testFilterCheckBoxes,
   getOffersData,
   testFilterSlider,
   setRandomFilters,
   checkIfFiltersAreReseted,
} from './utils/helpers';

describe('Test job offers filters', () => {
   it('Test filtering by job type', async () => {
      render(<App />);
      // Wait for offers to be available
      await waitFor(() => {
         expect(screen.getByTestId('jobs-container')).toBeTruthy();
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
         expect(screen.getByTestId('jobs-container')).toBeTruthy();
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
         expect(screen.getByTestId('jobs-container')).toBeTruthy();
      });

      // Check if offers are displayed
      expect((await getOffersData()).length).toBeGreaterThan(0);
      // Test filters functionality
      await testFilterCheckBoxes('filter-location');
   });

   it('Test filtering by salary', async () => {
      render(<App />);
      // Wait for offers to be available
      await waitFor(() => {
         expect(screen.getByTestId('jobs-container')).toBeTruthy();
      });

      // Check if offers are displayed
      expect((await getOffersData()).length).toBeGreaterThan(0);
      // Test filters functionality
      await testFilterSlider('filter-salary-min');
   });

   it('Test resetting filters', async () => {
      render(<App />);
      // Wait for offers to be available
      await waitFor(() => {
         expect(screen.getByTestId('jobs-container')).toBeTruthy();
      });

      // Check if offers are displayed
      const offersInit = (await getOffersData()).length;
      expect(offersInit).toBeGreaterThan(0);

      // Randomize filters
      await setRandomFilters();
      const offersAfter = (await getOffersData()).length;
      expect(offersInit != offersAfter).toBeTruthy();

      // Reset filters and check filters status
      const resetButton = screen.getByTestId('clear-filters');
      await userEvent.click(resetButton);
      expect(await checkIfFiltersAreReseted()).toBeTruthy();

      // Offers list length should be the same as the initial list length
      const offersReset = (await getOffersData()).length;
      expect(offersInit === offersReset).toBeTruthy();
   });
});
