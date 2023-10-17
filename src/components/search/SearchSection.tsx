import React from 'react';
import useJobsStore from '../../store/useJobsStore';
import SearchBar from './SearchBar';
import styles from './SearchSection.module.scss';

function SearchSection(): React.ReactElement {
   const { jobs, searchTitle, setSearchTitle, searchLocation, setSearchLocation } = useJobsStore();
   return (
      <section className={styles.container}>
         <SearchBar
            jobs={jobs}
            searchFor="title"
            searchValue={searchTitle}
            setSearchValue={setSearchTitle}
         />
         {/* <SearchBar
            jobs={jobs}
            searchFor="city"
            searchValue={searchLocation}
            setSearchValue={setSearchLocation}
         /> */}
      </section>
   );
}

export default SearchSection;
