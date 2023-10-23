import React from 'react';
import './JobOffersList.scss'
import JobOfferCard from './JobOfferCard';
import { IJobs } from '../../../services/types';

interface JobOffersListProps {
    offers: IJobs;
}

function JobOffersList({ offers }: JobOffersListProps) {
    return (
        <div className="job-offers-list">
            {offers.map((offer) => (
                <JobOfferCard
                    key={offer._id}
                    id={offer._id}
                    title={offer.title}
                    companyName={offer.companyName}
                    city={offer.city}
                    country={offer.country}
                    workLocation={offer.workLocation}
                    seniority={offer.seniority}
                    salaryFrom={offer.salaryFrom}
                    salaryTo={offer.salaryTo}
                    currency={offer.currency}
                    image={offer.image}
                    createdAt={offer.createdAt}
                />
            ))}
        </div>
    );
}

export default JobOffersList;