import React from 'react';
import './App.css';
import { Container } from './components/Container/Container';
import JobList from './components/JobList/JobList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchSection from './components/search/SearchSection';

const queryClient = new QueryClient();

function App(): React.ReactElement {
   return (
      <QueryClientProvider client={queryClient}>
         <Container>
            <h1>JoBoard 🛹</h1>
            <SearchSection />
            <JobList />
         </Container>
      </QueryClientProvider>
   );
}

export default App;
