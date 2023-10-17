import React from 'react';
import useJobsStore from '../../store/useJobsStore';
import SearchBar from './SearchBar';
import styles from './SearchSection.module.scss';

function SearchSection(): React.ReactElement {
   const {
      jobs,
      filteredJobs,
      searchTitle,
      setSearchTitle,
      searchLocation,
      setSearchLocation,
      clearSearch,
   } = useJobsStore();
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
         <div className={styles.information}>
            <p>
               {filteredJobs.length} offer{filteredJobs.length > 1 && 's'} found
               {searchTitle && ` for "${searchTitle}"`}
            </p>
            <span onClick={clearSearch}>Clear search</span>
         </div>
      </section>
   );
}

export default SearchSection;
