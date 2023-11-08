import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckBox from '../src/components/CheckBox/CheckBox';

test('enables the checkbox when clicked', () => {
   // Przygotuj dane dla testu
   const option: Option = {
      keyName: 'testKey',
      label: 'Test Label',
      value: false,
      setValue: (keyName, value) => {
         // Mock funkcji setValue
      },
   };

   // Renderuj komponent CheckBox z danymi testowymi
   render(<CheckBox option={option} />);

   // Znajdź element checkbox
   const checkbox = screen.getByText('Test Label') as HTMLInputElement;

   // Sprawdź, czy checkbox jest początkowo niezaznaczony
   expect(checkbox.checked).toBe(false);

   // Kliknij na checkbox, aby go zaznaczyć
   fireEvent.click(checkbox);

   // Sprawdź, czy checkbox jest zaznaczony
   expect(checkbox.checked).toBe(true);
});
