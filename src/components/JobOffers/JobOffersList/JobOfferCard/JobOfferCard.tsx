import React from 'react';
import './JobOfferCard.scss'

export class JobOffer {
    id: string;
    title: string;
    companyName: string;
    city: string;
    country: string;
    workLocation: string;
    seniority: string;
    salaryFrom: number;
    salaryTo: number;
    currency: string;
    image: string;
    createdAt: string;

    constructor(id: string, title: string, companyName: string, city: string, country: string, workLocation: string, seniority: string, salaryFrom: number, salaryTo: number, currency: string, image: string, createdAt: string) {
        this.id = id
        this.title = title
        this.companyName = companyName
        this.city = city
        this.country = country
        this.workLocation = workLocation
        this.seniority = seniority
        this.salaryFrom = salaryFrom
        this.salaryTo = salaryTo
        this.currency = currency
        this.image = image
        this.createdAt = createdAt
    }
}

function JobOfferCard(props: JobOffer) {
    return (
        <div className="offer">
            <img src={props.image} alt="logo" className="logo"/>
            <div className="offer-data">
                <div className="title">Kolumna 2. {props.title}</div>
                <div className="offer-details">
                    <div className="company">{props.companyName}</div>
                    <div className="location-seniority">
                        <Separator/>
                        <div>{props.city}, {props.country}</div>
                        <Separator/>
                        <div>{props.workLocation}</div>
                        <Separator/>
                        <div>{props.seniority}</div>
                        <Separator/>
                        <div className="salary">{props.salaryFrom} - {props.salaryTo} {props.currency} net</div>
                    </div>
                </div>
            </div>
            <DaysElapsed {...props}/>
        </div>
    )
}

function Separator() {
    return (
        <div className="separator"></div>
    )
}

function DaysElapsed(props: JobOffer) {
    const daysElapsed = Ago(props.createdAt);
    switch (daysElapsed) {
        case 0:
            return (
                <div className="days-elapsed">today</div>
            )
        case 1:
            return (
                <div className="days-elapsed">{daysElapsed} day ago</div>
            )
        default:
            return (
                <div className="days-elapsed">{daysElapsed} days ago</div>
            )
    }
}

function Ago(createdAt: string): number {
    const createdAtDate = new Date(createdAt);
    const today = new Date();
    const daysDiff = today.getDay() - createdAtDate.getDay();
    return daysDiff;
}

export default JobOfferCard;