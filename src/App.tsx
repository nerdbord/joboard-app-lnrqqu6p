import React, { useEffect, useState } from 'react';
import './App.css';
import { Container } from './components/Container/Container';
import JobList from './components/JobList/JobList';
import { getJobs } from './services/api';
import {IJob} from "./services/types"

function App(): React.ReactElement {
   const [jobs, setJobs] = useState<IJob[]>([]);

   const getAllJobs = async () => {
      try {
         const response = await getJobs();
         const fetchedJobs = response.data
         setJobs(fetchedJobs ? fetchedJobs : []);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllJobs()
   }, []);

   return (
      <Container>
         <h1>JoBoard 🛹</h1>
         <JobList>
            {jobs.map(({_id, title}) => 
            <p key={_id}>{title}</p>
            )}
         </JobList>
      </Container>
   );
}

export default App;
