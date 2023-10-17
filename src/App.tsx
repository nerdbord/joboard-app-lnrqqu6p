import React, { useEffect } from 'react';
import './App.css';
import { Container } from './components/Container/Container';
import JobList from './components/JobList/JobList';
import { getJobs } from './services/api';
import useJobsStore from './store/useJobsStore';
import SearchSection from './components/search/SearchSection';

function App(): React.ReactElement {
   const { setJobs, filteredJobs } = useJobsStore();

   useEffect(() => {
      getAllJobs();
   }, []);

   const getAllJobs = async (): Promise<void> => {
      try {
         const response = await getJobs();
         const fetchedJobs = response.data;
         setJobs(fetchedJobs ? fetchedJobs : []);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Container>
         <h1>JoBoard 🛹</h1>
         <SearchSection />

         <JobList>
            {filteredJobs.map(({ _id, title }) => (
               <p key={_id}>{title}</p>
            ))}
         </JobList>
      </Container>
   );
}

export default App;
