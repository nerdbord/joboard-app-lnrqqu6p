import React from 'react';
import './App.css';
import { Container } from './components/Container/Container';
import JobList from './components/JobList/JobList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchSection from './components/search/SearchSection';
import JobFiltersSection from './components/JobFilters/JobFiltersSection';
import { ContainerFilters } from './components/ContainerFilters/ContainerFilters';
import { ContainerJobs } from './components/ContainerJobs/ContainerJobs';

const queryClient = new QueryClient();

function App(): React.ReactElement {
   return (
      <QueryClientProvider client={queryClient}>
         <Container>
            <ContainerFilters>
               <h1>👾 JO-BOARD</h1>
               <JobFiltersSection />
            </ContainerFilters>

            <ContainerJobs>
               <SearchSection />
               <JobList />
            </ContainerJobs>
         </Container>
      </QueryClientProvider>
   );
}

export default App;
