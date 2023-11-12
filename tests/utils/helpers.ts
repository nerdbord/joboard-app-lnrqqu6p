import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
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
// How: Set one filter checkbox and then check if offers are correctly filtered, then
//      uncheck current checkbox and set next one and check offers again..
//      Checks every option under provided type/name.
export const testFilterCheckBoxes = async (name: string) => {
   // #1 Get container with checkboxes (by provided type/name)
   const filtersContainer = screen.getByTestId(name);
   // #2 Get checkboxes within container
   const checkboxes = filtersContainer.querySelectorAll('[data-testid="filter-option"]');
   expect(checkboxes.length).toBeGreaterThan(0);

   // #3 Loop over checkboxes and test each functionality(proper filtering)
   for (const checkbox of checkboxes) {
      // Get single checkbox data: { offerKeyName: offerKeyName, offerOption: label, value: value }
      const dataBefore: FilterData = JSON.parse(
         checkbox.getAttribute('data-test-option') as string,
      );
      // Click on checkbox
      await userEvent.click(checkbox);
      // Get data after click and compare it with previous data
      const dataAfter: FilterData = JSON.parse(checkbox.getAttribute('data-test-option') as string);
      // Data value before and after should be different (false -> true)
      expect(dataBefore.value !== dataAfter.value).toBeTruthy();
      // Check if offers are correctly filtered
      expect(await isOfferListFiltered(dataAfter)).toBeTruthy();
      // Reset state to false, to not interfere with next checkbox testing
      await userEvent.click(checkbox);
      const dataReset: FilterData = JSON.parse(checkbox.getAttribute('data-test-option') as string);
      expect(dataReset.value).toBeFalsy();
   }
};

// Test filters functionality - sliders
export const testFilterSlider = async (name: string) => {
   // Get random value between 0 and max slider value
   const maxValue = 160000;
   const randomValue = Math.floor(Math.random() * (maxValue + 1));

   // #1 Get container with sliders (by provided type/name)
   const filtersContainer = screen.getByTestId(name);
   // #2 Get sliders within container
   const slider = filtersContainer.querySelector('[data-testid="filter-option"]');
   expect(slider).not.toBeNull();

   if (slider) {
      // Get slider data
      const dataBefore: FilterData = JSON.parse(slider.getAttribute('data-test-option') as string);
      expect(dataBefore.value).toBe(0);
      // Change value of slider
      fireEvent.change(slider, { target: { value: randomValue } });
      // Get data after change and compare it with previous data
      const dataAfter: FilterData = JSON.parse(slider.getAttribute('data-test-option') as string);
      // Data value before and after should be different
      expect(dataAfter.value).toBe(randomValue);

      // Check if offers are correctly filtered
      expect(await isOfferListFiltered(dataAfter)).toBeTruthy();
      // Reset slider to default state
      fireEvent.change(slider, { target: { value: 0 } });
      const dataReset: FilterData = JSON.parse(slider.getAttribute('data-test-option') as string);
      expect(dataReset.value).toBe(0);
   }
};

export const testFilterTextInput = async (name: string) => {
   const textInput = screen.getByTestId(`search-${name}`) as HTMLInputElement;
   const dataBefore: FilterData = JSON.parse(textInput.getAttribute('data-test-option') as string);
   const valueBefore = textInput.value;
   // Init value of text input should be empty string
   expect(valueBefore).toBe('');
   expect(dataBefore.value).toBe('');

   // Click on text input and type sth
   // (eg. for location "ne" should display offers in Sydney and New York)
   // (eg. for job title "ne" should display offers like "Software Engineer" "Business Analyst" etc.)
   await userEvent.click(textInput);
   const testText = 'ne';
   await userEvent.keyboard(testText);

   // Check if input value is equal to provided value
   const dataAfter: FilterData = JSON.parse(textInput.getAttribute('data-test-option') as string);
   const valueAfter = textInput.value;
   expect(valueAfter).toBe(testText);
   expect(dataAfter.value).toBe(testText);

   // Check if offers are correctly filtered
   expect(await isOfferListFiltered(dataAfter)).toBeTruthy();

   // Set the text input value to an empty string
   await userEvent.clear(textInput);
   // Verify if the value is now an empty string
   const dataReset: FilterData = JSON.parse(textInput.getAttribute('data-test-option') as string);
   expect(textInput.value).toBe('');
   expect(dataReset.value).toBe('');
};

// Check if offer list is filtered according to setted filter
const isOfferListFiltered = async (filter: FilterData): Promise<boolean> => {
   // Get currently displayed offer list
   const offers = await getOffersData();
   // Loop over offers and check if there are filtered offers
   if (offers.length > 0) {
      for (const offer of offers) {
         if (typeof offer[filter.offerKeyName] === 'number' && typeof filter.value === 'number') {
            // Compare number values
            if (filter.offerOption.includes('-min')) {
               // Slider setted minimum value
               if ((offer[filter.offerKeyName] as number) < filter.value) {
                  // When salary of job offer is less than minimum setted value then array is incorrectly filtered
                  return false;
               }
            } else if (filter.offerOption.includes('-max')) {
               // Slider setted maximum value(currently there is no one in app)
               if ((offer[filter.offerKeyName] as number) > filter.value) {
                  // When salary of job offer is greater than maximum setted value then array is incorrectly filtered
                  return false;
               }
            }
         } else if (
            typeof offer[filter.offerKeyName] === 'string' &&
            typeof filter.value === 'boolean'
         ) {
            // When checkbox is checked then compare offer data with setted to filter
            //  (eg. When "Job Type" filter checkbox eg. "Contract" is checked then
            //      offer.jobType should be equal to Contract, and only that offers should be displayed )
            if (
               filter.value &&
               (offer[filter.offerKeyName] as string).toLowerCase() !==
                  filter.offerOption.toLowerCase()
            ) {
               // Values doesn't match, offer list is incorrectly filtered
               return false;
            }
         } else if (
            typeof offer[filter.offerKeyName] === 'string' &&
            typeof filter.value === 'string'
         ) {
            // Check input inputs agains proper filtering.
            // Offerlist should display only that offers which includes provided input text(job title/location)
            if (
               !(offer[filter.offerKeyName] as string)
                  .toLowerCase()
                  .includes((filter.value as string).toLowerCase())
            ) {
               // Values doesn't match, offer list is incorrectly filtered
               return false;
            }
         }
      }
   }
   // Offer list is correctly filtered
   return true;
};

export const checkIfFiltersAreReseted = async (): Promise<boolean> => {
   const filters = screen.queryAllByRole('filters-section');
   for (const filter of filters) {
      const filterElements = filter.querySelectorAll('[data-testid="filter-option"]');
      expect(filterElements.length).toBeGreaterThan(0);

      for (const filterElement of filterElements) {
         // Get single checkbox data
         const dataBefore: FilterData = JSON.parse(
            filterElement.getAttribute('data-test-option') as string,
         );
         // Each [boolean] filter element should set to false
         if (typeof dataBefore.value === 'boolean' && dataBefore.value !== false) {
            return false;
         }
         // Each [number] filter element should set to 0
         if (typeof dataBefore.value === 'number' && dataBefore.value !== 0) {
            return false;
         }
      }
   }
   return true;
};

export const setRandomFilters = async () => {
   const filters = screen.queryAllByRole('filters-section');
   for (const filter of filters) {
      const filterElements = filter.querySelectorAll('[data-testid="filter-option"]');
      expect(filterElements.length).toBeGreaterThan(0);

      // randomly change elements
      for (const filterElement of filterElements) {
         if (Math.random() < 0.5) {
            // Get single checkbox data
            const dataBefore: FilterData = JSON.parse(
               filterElement.getAttribute('data-test-option') as string,
            );

            if (typeof dataBefore.value === 'boolean') {
               // Click on checkbox
               await userEvent.click(filterElement);
               // Get data after click and compare it with previous data
               const dataAfter: FilterData = await JSON.parse(
                  filterElement.getAttribute('data-test-option') as string,
               );

               // Data value before and after should be different (false -> true)
               expect(dataBefore.value !== dataAfter.value).toBeTruthy();
            } else if (typeof dataBefore.value === 'number') {
               const maxValue = 160000;
               const randomValue = Math.floor(Math.random() * (maxValue + 1));

               // Get slider data
               const dataBefore: FilterData = JSON.parse(
                  filterElement.getAttribute('data-test-option') as string,
               );
               expect(dataBefore.value).toBe(0);
               // Change value of slider
               fireEvent.change(filterElement, { target: { value: randomValue } });
               // Get data after change and compare it with previous data
               const dataAfter: FilterData = JSON.parse(
                  filterElement.getAttribute('data-test-option') as string,
               );
               // Data value before and after should be different
               expect(dataAfter.value).toBe(randomValue);
            }
         }
      }
   }
};
