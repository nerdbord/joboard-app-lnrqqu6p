import React from 'react';
import './JobOffers.scss'
import JobOffersList from "./JobOffersList/JobOffersList";
import { useGetJobs } from '../../services/queries';
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins";

function JobOffers() {
    const { data: offers, isLoading, isError } = useGetJobs();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error while fetching data.</div>;
    }

    return (
        <div className="job-offers-container">
            <JobOffersList offers={offers}/>
        </div>
    );
}

export default JobOffers;
