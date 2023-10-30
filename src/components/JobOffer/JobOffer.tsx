import React from 'react';
import { useGetOfferById } from '../../services/queries';
import useJobsStore from '../../store/useJobsStore';
import style from './JobOffer.module.scss';
import closeIcon from "../../assets/close.svg";

const JobOffer: React.FC = () => {
   const { offer, currentOfferId, setIsOfferWindowOper, isOfferWindowOpen  } = useJobsStore();
   const { isError, isPending } = useGetOfferById(currentOfferId);
   console.log(offer);

   if (isError) {
      return <div>Error occurred while fetching jobs.</div>;
   }

   if (isPending) {
      return <div>Loading...</div>;
   }

   const handleOnCloseClick = () => {
      setIsOfferWindowOper(!isOfferWindowOpen)
   }

   const dayInterval = (created: string) => {
      const creationDate = new Date(created);
      const nowDate = new Date();
      const differenceInTime = nowDate.getTime() - creationDate.getTime();
      const dayInMiliseconds = 1000 * 60 * 60 * 24;
      const differenceInDays = Math.ceil(differenceInTime / dayInMiliseconds);
      return differenceInDays > 1
         ? differenceInDays + ' days ago'
         : differenceInDays === 1
         ? ' day ago'
         : 'today';
   };

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
               workLocation,
               _id,
            }) => {
               return (
                  <React.Fragment key={_id}>
                     <header className={style.headerContainer} key={_id}>
                        <img src={image} alt="Offer logo" className={style.logo} />
                        <div className={style.titleBox}>
                           <h2 className={style.title}>{title.toUpperCase()}</h2>
                           <p className={style.technologies}>
                              {technologies
                                 .map((technology) => technology.toUpperCase())
                                 .join(' ・ ')}
                           </p>
                        </div>
                     </header>
                     <section className={style.textSection}>
                        <div className={style.textContainer}>
                           <h3 className={style.textTitle}>{title}</h3>
                           <p className={style.description}>{description}</p>
                        </div>
                        <div className={style.detailsContainer}>
                           <div className={style.buttonBox}>
                              <button className={style.btn}>
                                 <a href={offerUrl}>Visit offer ➔</a>
                              </button>
                           </div>
                           <div className={style.infoColumnContainer}>
                              <div className={style.infoBox}>
                                 <p className={style.infoTitle}>Added</p>
                                 <p className={style.infoDescription}>{dayInterval(createdAt)}</p>
                              </div>
                              <div className={style.infoBox}>
                                 <p className={style.infoTitle}>Company</p>
                                 <p className={style.infoDescription}>{companyName}</p>
                              </div>
                              <div className={style.infoBox}>
                                 <p className={style.infoTitle}>Seniority</p>
                                 <p className={style.infoDescription}>{seniority}</p>
                              </div>
                              <div className={style.infoBox}>
                                 <p className={style.infoTitle}>Location</p>
                                 <p className={style.infoDescription}>
                                    <span>{city},</span>
                                    <span>{country}</span>
                                 </p>
                              </div>
                              <div className={style.infoBox}>
                                 <p className={style.infoTitle}>Job type</p>
                                 <p className={style.infoDescription}>
                                    <span>{workLocation},</span>
                                    <span>{jobType}</span>
                                 </p>
                              </div>
                              <div className={style.infoBox}>
                                 <p className={style.infoTitle}>Contract</p>
                                 <p className={style.infoDescription}>{jobType}</p>
                              </div>
                              <div className={style.infoBox}>
                                 <p className={style.infoTitle}>Salary</p>
                                 <p className={style.infoDescription}>
                                    {salaryFrom} – {salaryTo} {currency} netto
                                 </p>
                              </div>
                           </div>
                        </div>
                     </section>
                     <img src={closeIcon} alt="Close icon" className={style.closeIcon} onClick={handleOnCloseClick}/>
                  </React.Fragment>
               );
            },
         )}
      </>
   );
};

export default JobOffer;
