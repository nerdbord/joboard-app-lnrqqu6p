import React, { useState } from 'react';
import type { IJobs } from '../../services/types';
import styles from './SearchBar.module.scss';
import LoupeIcon from '../icons/LoupeIcon';
import LocationIcon from '../icons/LocationIcon';

interface Props {
   jobs: IJobs;
   zIndex: number;
   searchFor: 'title' | 'city';
   searchValue: string;
   setSearchValue: (searchValue: string) => void;
}

export const SearchByJobTitle: React.FC<Props> = ({
   jobs,
   zIndex,
   searchFor,
   searchValue,
   setSearchValue,
}) => {
   const [inputFocused, setInputFocused] = useState(false);

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
   const handleBlurInput = () => {
      setTimeout(() => {
         setInputFocused(false);
      }, 100);
   };
   return (
      <div className={styles.container} style={{ zIndex: zIndex }}>
         <div className={styles.searchFieldContainer} data-testid="filter-search-text">
            <input
               className={styles.searchInput}
               type="text"
               value={searchValue}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
               onFocus={() => setInputFocused(true)}
               onBlur={handleBlurInput}
               placeholder={searchFor === 'title' ? 'Search for' : 'Search location'}
               data-testid={searchFor}
            />
            <div className={styles.icon}>
               {searchFor === 'city' ? <LocationIcon /> : <LoupeIcon />}
            </div>
         </div>

         {/* Autocomplete items */}
         {inputFocused && searchValue && (
            <div className={styles.dropdown}>
               {jobs
                  .filter((item, idx, self) => {
                     const suggestion = item[searchFor].toLocaleLowerCase();
                     const searchVal = searchValue.toLocaleLowerCase();
                     return (
                        suggestion !== searchVal && //hide when searchValue is equal to autocomplete suggestion
                        suggestion.includes(searchVal) &&
                        (searchFor !== 'city' || //Ommit city autocomplete duplicates
                           !self.slice(0, idx).some((el) => el.city === item.city))
                     );
                  })
                  .slice(0, 4)
                  .map((job) => (
                     <div
                        key={job._id}
                        className={styles.dropdownItem}
                        onClick={() => setSearchValue(job[searchFor])}
                     >
                        {highlightMatch(job[searchFor])}
                        {searchFor === 'title' && <p>{job.companyName}</p>}
                     </div>
                  ))}
            </div>
         )}
      </div>
   );
};

export default SearchByJobTitle;
