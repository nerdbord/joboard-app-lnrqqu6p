import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import React from 'react';
import { render } from '@testing-library/react';

export const mswHandlers = [
    http.get('*/offers',
    ({ request, params, cookies }) => {
        return HttpResponse.json(
            [
                {
                  "_id": "648b7add0905a510f1c7fdf9",
                  "title": "Marketing Manager",
                  "companyName": "XYZ Corp",
                  "city": "London",
                  "country": "UK",
                  "workLocation": "Part-remote",
                  "jobType": "Contract",
                  "seniority": "Expert",
                  "salaryFrom": 80000,
                  "salaryTo": 120000,
                  "currency": "GBP",
                  "technologies": [
                    "Digital Marketing",
                    "SEO",
                    "Social Media"
                  ],
                  "description": "We are seeking an experienced Marketing Manager to lead our marketing initiatives. You will be responsible for developing and executing marketing strategies, optimizing SEO, and managing social media campaigns. The ideal candidate should have a proven track record in marketing and be knowledgeable about the latest digital marketing trends.",
                  "offerUrl": "https://nerdbord.io",
                  "__v": 0,
                  "createdAt": "2023-06-15T20:55:57.197Z",
                  "updatedAt": "2023-10-14T19:49:23.556Z",
                  "image": "https://i.imgur.com/yaKYWeN.png"
                }
            ]
        )
      }
    )
]

const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
})

export function renderWithClient(ui: React.ReactElement) {
    const testQueryClient = createTestQueryClient()
    const { rerender, ...result } = render(
        <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    )
    return {
        ...result,
        rerender: (rerenderUi: React.ReactElement) =>
            rerender(
                <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
            ),
    }
}

export function createWrapper() {
    const testQueryClient = createTestQueryClient()
    return ({ children }: {children: React.ReactNode}) => (
        <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
    )
}