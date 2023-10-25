import React from 'react';
import { useGetOfferById } from '../../services/queries';
import useJobsStore from '../../store/useJobsStore';

const JobOffer: React.FC = () => {
   const { offer, currentOfferId } = useJobsStore();
   const { isError, isPending } = useGetOfferById(currentOfferId);

   if (isError) {
      return <div>Error occurred while fetching jobs.</div>;
   }

   if (isPending) {
      return <div>Loading...</div>;
   }

   return (
      <>
         {Array(offer).map(
            ({
               city,
               companyName,
               country,
               createdAt,
               currency,
               description,
               image,
               jobType,
               offerUrl,
               salaryFrom,
               salaryTo,
               seniority,
               technologies,
               title,
               updatedAt,
               workLocation,
            }) => {
               return (
                  <>
                     <header>
                        <img src={image} alt="Offer logo" />
                        <div>
                           <h2>{title.toUpperCase()}</h2>
                           <p>
                              {technologies.map((technology) => {
                                 if (technologies.indexOf(technology) < technologies.length - 1) {
                                    return `${technology.toUpperCase()} *`;
                                 }
                              })}
                           </p>
                        </div>
                     </header>
                     <section>
                        <div>
                           <h3></h3>
                           <p></p>
                        </div>
                        <div>
                           <div>
                              <button>
                                 <a href={offerUrl}>Visit offer</a>
                              </button>
                           </div>
                           <div>
                              <div>
                                 <p>Added</p>
                                 <p></p>
                              </div>
                              <div>
                                 <p>Company</p>
                                 <p>{companyName}</p>
                              </div>
                              <div>
                                 <p>Seniority</p>
                                 <p>{seniority}</p>
                              </div>
                              <div>
                                 <p>Location</p>
                                 <p>
                                    {city}, {country}
                                 </p>
                              </div>
                              <div>
                                 <p>Job type</p>
                                 <p>
                                    {workLocation}, {jobType}
                                 </p>
                              </div>
                              <div>
                                 <p>Contract</p>
                                 <p></p>
                              </div>
                              <div>
                                 <p>Salary</p>
                                 <p>
                                    {salaryFrom} – {salaryTo} {currency} netto
                                 </p>
                              </div>
                           </div>
                        </div>
                     </section>
                  </>
               );
            },
         )}
      </>
   );
};

export default JobOffer;
