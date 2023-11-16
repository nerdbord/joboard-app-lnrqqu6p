import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import App from '../src/App';
import userEvent from '@testing-library/user-event';
import {
   getOffersData,
   expectCheckboxFilterToFilterOffers,
   expectSliderFilterToFilterOffers,
   setRandomFilters,
   checkIfFiltersAreReseted,
   expectTextSearchFilterToFilterOffers,
} from './utils/helpers';

describe('Test job offers filters', () => {
   it('Test filtering by job type (checkbox)', async () => {
      render(<App />);
      // Wait for offers to be available
      await waitFor(() => {
         expect(screen.getByTestId('jobs-container')).toBeTruthy();
      });

      // Check if offers are displayed
      expect((await getOffersData()).length).toBeGreaterThan(0);
      // Test filters functionality
      await expectCheckboxFilterToFilterOffers('jobType');
   });

   it('Test filtering by seniority (checkbox)', async () => {
      render(<App />);
      // Wait for offers to be available
      await waitFor(() => {
         expect(screen.getByTestId('jobs-container')).toBeTruthy();
      });

      // Check if offers are displayed
      expect((await getOffersData()).length).toBeGreaterThan(0);
      // Test filters functionality
      await expectCheckboxFilterToFilterOffers('seniority');
   });

   it('Test filtering by location (checkbox)', async () => {
      render(<App />);
      // Wait for offers to be available
      await waitFor(() => {
         expect(screen.getByTestId('jobs-container')).toBeTruthy();
      });

      // Check if offers are displayed
      expect((await getOffersData()).length).toBeGreaterThan(0);
      // Test filters functionality
      await expectCheckboxFilterToFilterOffers('workLocation');
   });

   it('Test filtering by location (text input)', async () => {
      render(<App />);
      // Wait for offers to be available
      await waitFor(() => {
         expect(screen.getByTestId('jobs-container')).toBeTruthy();
      });

      // Check if offers are displayed
      expect((await getOffersData()).length).toBeGreaterThan(0);
      // Test filters functionality
      await expectTextSearchFilterToFilterOffers('city');
   });

   it('Test filtering by job title (text input)', async () => {
      render(<App />);
      // Wait for offers to be available
      await waitFor(() => {
         expect(screen.getByTestId('jobs-container')).toBeTruthy();
      });

      // Check if offers are displayed
      expect((await getOffersData()).length).toBeGreaterThan(0);
      // Test filters functionality
      await expectTextSearchFilterToFilterOffers('title');
   });

   it('Test filtering by salary (slider)', async () => {
      render(<App />);
      // Wait for offers to be available
      await waitFor(() => {
         expect(screen.getByTestId('jobs-container')).toBeTruthy();
      });

      // Check if offers are displayed
      expect((await getOffersData()).length).toBeGreaterThan(0);
      // Test filters functionality
      await expectSliderFilterToFilterOffers('salaryFrom');
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
