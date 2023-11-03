import React from 'react';
import { render, screen } from '@testing-library/react';
import JobList from '../src/components/JobList/JobList';

test('displays "Loading..." text when isPending is true', () => {
   const { rerender } = render(<JobList isPending={true} />);

   const loadingText = screen.getByText('Loading...');
   expect(loadingText).toBeInTheDocument();

   rerender(<JobList isPending={false} />);

   expect(loadingText).not.toBeInTheDocument();
});
