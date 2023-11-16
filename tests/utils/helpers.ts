import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import type { IJob } from '../../src/services/types';

// Get currently displayed offers
export const getOffersData = async (): Promise<IJob[]> => {
   const offersElements = screen.queryAllByTestId('offer');
   const offersData = Array.from(offersElements).map((element) =>
      JSON.parse(element.getAttribute('data-test-offer') as string),
   );
   return offersData;
};

const getInputLabel = (input: Element) => {
   const label = input.parentElement?.querySelector('label')?.textContent;
   if (label) {
      return label;
   } else {
      return '';
   }
};

//###########################
// Test filters functionality - checkboxes
//###########################

// How: Set one filter checkbox and then expect offers to be correctly filtered, then
//      uncheck current checkbox and set next one and check offers again..
//      Checks every option under provided type/name.
export const expectCheckboxFilterToFilterOffers = async (keyName: keyof IJob) => {
   // #1 Get container with checkboxes (by provided type/name)
   const filtersContainer = screen.getByTestId(keyName);
   // #2 Get checkboxes within container
   const checkboxes = filtersContainer.querySelectorAll('[data-testid="filter-checkbox"] > input');
   expect(checkboxes.length).toBeGreaterThan(0);

   // #3 Loop over checkboxes and test each functionality(proper filtering)
   for (const checkbox of checkboxes) {
      const label = getInputLabel(checkbox);
      expect(label).not.toBe('');
      const valueBefore = (checkbox as HTMLInputElement).checked;
      // Click on checkbox
      await userEvent.click(checkbox);
      // Get data after click and compare it with previous data
      const valueAfter = (checkbox as HTMLInputElement).checked;
      // Data value before and after should be different (false -> true)
      expect(valueBefore !== valueAfter).toBeTruthy();

      // Check if offers are correctly filtered
      expect(
         await isOfferListFilteredBySettedCheckboxFilter(keyName, label, valueBefore),
      ).toBeTruthy();
      // Reset state to false, to not interfere with next checkbox testing
      await userEvent.click(checkbox);
      const valueReset = (checkbox as HTMLInputElement).checked;
      expect(valueReset).toBeFalsy();
   }
};

// Check if offer list is filtered according to setted checkbox filter
const isOfferListFilteredBySettedCheckboxFilter = async (
   keyName: keyof IJob,
   label: string,
   checked: boolean,
): Promise<boolean> => {
   // Get currently displayed offer list
   const offers = await getOffersData();
   // Loop over offers and check if there are filtered offers
   if (offers.length > 0) {
      for (const offer of offers) {
         //  (eg. When "Job Type" filter checkbox eg. "Contract" is checked then
         //      offer.jobType should be equal to Contract, and only that offers should be displayed )
         if (checked && (offer[keyName] as string).toLowerCase() !== label.toLowerCase()) {
            // Values doesn't match, offer list is incorrectly filtered
            return false;
         }
      }
   }
   // Offer list is correctly filtered
   return true;
};

//###########################
// Test filters functionality - sliders
//###########################

export const expectSliderFilterToFilterOffers = async (keyName: keyof IJob) => {
   // Get random value between 0 and max slider value
   const maxValue = 160000;
   const randomValue = Math.floor(Math.random() * (maxValue + 1));

   // #1 Get container with sliders (by provided type/name)
   const filtersContainer = screen.getByTestId(keyName);
   // #2 Get sliders within container
   const slider: HTMLInputElement | null = filtersContainer.querySelector(
      '[data-testid="filter-slider"] > input',
   );
   expect(slider).not.toBeNull();

   if (slider) {
      // Get slider data
      const valueBefore = parseInt(slider.value);
      expect(valueBefore).toBe(0);
      // Change value of slider
      fireEvent.change(slider, { target: { value: randomValue } });
      // Get data after change and compare it with previous data
      const valueAfter = parseInt(slider.value);
      // Data value before and after should be different
      expect(valueAfter).toBe(randomValue);
      // Check if offers are correctly filtered
      expect(await isOfferListFilteredBySettedSliderFilter(keyName, valueAfter)).toBeTruthy();
      // Reset slider to default state
      fireEvent.change(slider, { target: { value: 0 } });
      const valueReset = parseInt(slider.value);
      expect(valueReset).toBe(0);
   }
};

// Check if offer list is filtered according to setted slider filter
const isOfferListFilteredBySettedSliderFilter = async (
   keyName: keyof IJob,
   value: number,
): Promise<boolean> => {
   // Get currently displayed offer list
   const offers = await getOffersData();
   // Loop over offers and check if there are filtered offers
   if (offers.length > 0) {
      for (const offer of offers) {
         // Compare number values
         if (keyName.includes('From')) {
            // Slider setted minimum value
            if ((offer[keyName] as number) < value) {
               // When salary of job offer is less than minimum setted value then array is incorrectly filtered
               return false;
            }
         } else if (keyName.includes('To')) {
            // Slider setted maximum value(currently there is no one in app)
            if ((offer[keyName] as number) > value) {
               // When salary of job offer is greater than maximum setted value then array is incorrectly filtered
               return false;
            }
         }
      }
   }
   // Offer list is correctly filtered
   return true;
};

//###########################
// Test filters functionality - search inputs
//###########################

export const expectTextSearchFilterToFilterOffers = async (keyName: keyof IJob) => {
   const textInput: HTMLInputElement = screen.getByTestId(keyName);
   const valueBefore = textInput.value;
   // Init value of text input should be empty string
   expect(valueBefore).toBe('');

   // Click on text input and type sth
   // (eg. for location "ne" should display offers in Sydney and New York)
   // (eg. for job title "ne" should display offers like "Software Engineer" "Business Analyst" etc.)
   await userEvent.click(textInput);
   const testText = 'ne';
   await userEvent.keyboard(testText);

   // Check if input value is equal to provided value
   const valueAfter = textInput.value;
   expect(valueAfter).toBe(testText);

   // Check if offers are correctly filtered
   expect(await isOfferListFilteredBySettedSearchText(keyName, valueAfter)).toBeTruthy();

   // Set the text input value to an empty string
   await userEvent.clear(textInput);
   // Verify if the value is now an empty string
   expect(textInput.value).toBe('');
};

// Check if offer list is filtered according to setted search text
const isOfferListFilteredBySettedSearchText = async (
   keyName: keyof IJob,
   value: string,
): Promise<boolean> => {
   // Get currently displayed offer list
   const offers = await getOffersData();
   // Loop over offers and check if there are filtered offers
   if (offers.length > 0) {
      for (const offer of offers) {
         // Check input inputs agains proper filtering.
         // Offerlist should display only that offers which includes provided input text(job title/location)
         if (!(offer[keyName] as string).toLowerCase().includes(value.toLowerCase())) {
            // Values doesn't match, offer list is incorrectly filtered
            return false;
         }
      }
   }
   // Offer list is correctly filtered
   return true;
};

//###########################
// Check if filters are reseted to default values
//###########################

// Check if checkboxes are reseted
export const checkIfCheckboxFiltersAreReseted = async (): Promise<boolean> => {
   const checkboxes = Array.from(
      document.querySelectorAll('[data-testid="filter-checkbox"] > input'),
   );
   expect(checkboxes.length).toBeGreaterThan(0);

   for (const checkbox of checkboxes) {
      // Get single checkbox data
      const valueBefore = (checkbox as HTMLInputElement).checked;
      // Each checkbox element should be setted to false
      if (valueBefore !== false) {
         return false;
      }
   }

   return true;
};

// Check if sliders are reseted
export const checkIfSliderFiltersAreReseted = async (): Promise<boolean> => {
   const sliders = Array.from(document.querySelectorAll('[data-testid="filter-slider"] > input'));
   expect(sliders.length).toBeGreaterThan(0);

   for (const slider of sliders) {
      // Get single checkbox data
      const valueBefore = parseInt((slider as HTMLInputElement).value);
      // Each slider element should be setted to 0
      if (valueBefore !== 0) {
         return false;
      }
   }

   return true;
};

// Check if all filters are reseted
export const checkIfFiltersAreReseted = async (): Promise<boolean> => {
   if ((await checkIfSliderFiltersAreReseted()) && (await checkIfCheckboxFiltersAreReseted())) {
      return true;
   }
   return false;
};

//###########################
// Randomize filters
//###########################

// Randomize checkboxes
export const setRandomCheckboxFilters = async () => {
   const checkboxes = Array.from(
      document.querySelectorAll('[data-testid="filter-checkbox"] > input'),
   );

   // randomly change elements
   for (const checkbox of checkboxes) {
      if (Math.random() < 0.5) {
         // Get single checkbox data
         const valueBefore = (checkbox as HTMLInputElement).checked;
         // Click on checkbox
         await userEvent.click(checkbox);
         // Get data after click and compare it with previous data
         const valueAfter = (checkbox as HTMLInputElement).checked;
         // Data value before and after should be different (false -> true)
         expect(valueBefore !== valueAfter).toBeTruthy();
      }
   }
};

// Randomize sliders
export const setRandomSliderFilters = async () => {
   const sliders = Array.from(document.querySelectorAll('[data-testid="filter-slider"] > input'));
   expect(sliders.length).toBeGreaterThan(0);
   // randomly change elements
   for (const slider of sliders) {
      if (Math.random() < 0.5) {
         const maxValue = 160000;
         const randomValue = Math.floor(Math.random() * (maxValue + 1));
         // Get slider data
         const valueBefore = parseInt((slider as HTMLInputElement).value);
         expect(valueBefore).toBe(0);
         // Change value of slider
         fireEvent.change(slider, { target: { value: randomValue } });
         // Get data after change and compare it with previous data
         const valueAfter = parseInt((slider as HTMLInputElement).value);
         // Data value before and after should be different
         expect(valueAfter).toBe(randomValue);
      }
   }
};

// Randomize all filters
export const setRandomFilters = async () => {
   await setRandomCheckboxFilters();
   await setRandomSliderFilters();
};
