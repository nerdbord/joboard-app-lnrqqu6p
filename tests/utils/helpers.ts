import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { IJob } from '../../src/services/types';

interface FilterData {
   offerKeyName: keyof IJob;
   offerOption: string;
   value: boolean | number;
}

// Get currently displayed offers
export const getOffersData = async (): Promise<IJob[]> => {
   const offersElements = screen.queryAllByTestId('offer');
   const offersData = Array.from(offersElements).map((element) =>
      JSON.parse(element.getAttribute('data-test-offer') as string),
   );
   return offersData;
};

// Test filters functionality - checkboxes
// How: Check one filter checkbox and then check if offers are correctly filtered, then
//      uncheck current checkbox and check next one and check offers again.. 
//      Checks every option under provided type/name.
export const testFilterCheckBoxes = async (name: string) => {
   // #1 Get container with checkboxes (by provided type/name)
   const filtersContainer = screen.getByTestId(name);
   // #2 Get checkboxes within container
   const checkboxes = filtersContainer.querySelectorAll('[data-testid="filter-option"]');

   // #3 Loop over checkboxes and test each functionality(proper filtering)
   for (const checkbox of checkboxes) {
      // Get single checkbox data: { keyName: offerKeyName, offerOption: label, value: value }
      const dataBefore: FilterData = JSON.parse(
         checkbox.getAttribute('data-test-option') as string,
      );
      // Click on checkbox
      await userEvent.click(checkbox);
      // Get data after click and compare it with previous data
      const dataAfter: FilterData = JSON.parse(checkbox.getAttribute('data-test-option') as string);
      // Data value before and after should be different (false -> true)
      expect(dataBefore.value !== dataAfter.value).toBeTruthy();

      expect(await isOfferListFiltered(dataAfter)).toBeTruthy();
      // Reset state to false, to not interfere with next checkbox testing
      await userEvent.click(checkbox);
      const dataReset: FilterData = JSON.parse(checkbox.getAttribute('data-test-option') as string);
      expect(dataReset.value).toBeFalsy();
   }
};

// Check if offer list is filtered according to setted filter
const isOfferListFiltered = async (filter: FilterData) => {
   // Get currently displayed offer list
   const offers = await getOffersData();
   // Loop over offers and check if there are filtered offers
   if (offers.length > 0) {
      for (const offer of offers) {
         // When checkbox is checked then compare offer data with setted to filter
         //  (eg. When "Job Type" filter checkbox eg. "Contract" is checked then
         //      offer.jobType should be equal to Contract, and only that offers should be displayed )
         if (
            filter.value &&
            (offer[filter.offerKeyName] as string).toLowerCase() !== filter.offerOption.toLowerCase()
         ) {
            // Values doesn't match, offer list is incorrectly filtered
            return false;
         }
      }
   }
   // Offer list is correctly filtered
   return true;
};