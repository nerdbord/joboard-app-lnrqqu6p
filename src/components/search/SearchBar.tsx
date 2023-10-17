import React from 'react';
import type { IJobs } from '../../services/types';
import styles from './SearchBar.module.scss';
import LoupeIcon from '../icons/LoupeIcon';
import LocationIcon from '../icons/LocationIcon';

interface Props {
   jobs: IJobs;
   searchFor: 'title' | 'city';
   searchValue: string;
   setSearchValue: (searchValue: string) => void;
}

export const SearchByJobTitle: React.FC<Props> = ({
   jobs,
   searchFor,
   searchValue,
   setSearchValue,
}) => {
   const handleInputChange = (value: string) => {
      setSearchValue(value);
   };

   const highlightMatch = (suggestion: string) => {
      const searchVal = searchValue.toLocaleLowerCase();
      const index = suggestion.toLocaleLowerCase().indexOf(searchVal);

      if (index !== -1) {
         const start = suggestion.substring(0, index);
         const match = suggestion.substring(index, index + searchVal.length);
         const end = suggestion.substring(index + searchVal.length);
         return (
            <p>
               {start}
               <span>{match}</span>
               {end}
            </p>
         );
      } else {
         return suggestion;
      }
   };
   return (
      <div className={styles.container}>
         <div className={styles.searchFieldContainer}>
            <input
               className={styles.searchInput}
               type="text"
               value={searchValue}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e.target.value)
               }
               placeholder={searchFor === 'title' ? 'Search for' : 'Search location'}
            />
            <div className={styles.icon}>
               {searchFor === 'city' ? <LocationIcon /> : <LoupeIcon />}
            </div>
         </div>

         {/* Autocomplete items */}
         <div className={styles.dropdown}>
            {jobs
               .filter((item, idx, self) => {
                  const suggestion = item[searchFor].toLocaleLowerCase();
                  const searchVal = searchValue.toLocaleLowerCase();
                  return (
                     searchVal &&
                     suggestion !== searchVal &&
                     suggestion.includes(searchVal) &&
                     (searchFor !== 'city' ||
                        !self.slice(0, idx).some((el) => el.city === item.city))
                  );
               })
               .slice(0, 4)
               .map((job) => (
                  <div
                     key={job._id}
                     className={styles.dropdownItem}
                     onClick={() => handleInputChange(job[searchFor])}
                  >
                     {highlightMatch(job[searchFor])}
                     {searchFor === 'title' && <p>{job.companyName}</p>}
                  </div>
               ))}
         </div>
      </div>
   );
};

export default SearchByJobTitle;
