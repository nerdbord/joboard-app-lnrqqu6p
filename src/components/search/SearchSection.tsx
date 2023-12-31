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
         <div className={styles.searchBarsContainer}>
            <SearchBar
               zIndex={2}
               jobs={jobs}
               searchFor="title"
               searchValue={searchTitle}
               setSearchValue={setSearchTitle}
            />
            <SearchBar
               zIndex={1}
               jobs={jobs}
               searchFor="city"
               searchValue={searchLocation}
               setSearchValue={setSearchLocation}
            />
         </div>
         {filteredJobs && (
            <div className={styles.information}>
               <p>
                  {filteredJobs.length} offer{filteredJobs.length > 1 && 's'} found
                  {searchTitle && ` for "${searchTitle}" `}
                  {searchLocation && ` in "${searchLocation}"`}
               </p>
               {(searchTitle || searchLocation) && <span onClick={clearSearch}>Clear search</span>}
            </div>
         )}
      </section>
   );
}

export default SearchSection;
