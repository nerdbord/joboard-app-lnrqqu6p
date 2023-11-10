import React from 'react';
import { expect, test } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGetJobs } from '../src/services/queries';
import { createWrapper } from './utils/queries';

// describe('query hook', () => {
//     test('successful query hook', async () => {
//         const { result } = renderHook(() => useGetJobs(), {
//             wrapper: createWrapper()
//         })
//         await waitFor(() => expect(result.current.isSuccess).toBe(true))
//     })

//     test('is defined', async () => {
//         const { result } = renderHook(() => useGetJobs(), {
//             wrapper: createWrapper()
//         })
//         await waitFor(() => expect(result.current.data).toBeDefined())
//     })
// })

test('dummy test', async () => {});
