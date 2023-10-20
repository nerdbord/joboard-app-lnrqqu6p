import { ReactNode } from 'react';

export interface IJob {
   city: string;
   companyName: string;
   country: string;
   createdAt: string;
   currency: string;
   description: string;
   image: string;
   jobType: string;
   offerUrl: string;
   salaryFrom: number;
   salaryTo: number;
   seniority: string;
   technologies: string[];
   title: string;
   updatedAt: string;
   workLocation: string;
   __v: number;
   _id: string;
}

export type IJobs = IJob[];

export type PropsWithChildren = {
   children: ReactNode;
};
