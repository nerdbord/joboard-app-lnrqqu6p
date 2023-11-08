import {afterEach} from 'vitest';
import {cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node'
import { mswHandlers } from './testUtils'

console.log('Start setup.js')
export const server = setupServer(...mswHandlers)

beforeAll(() => {
    server.listen()
    console.log('Start server msw listening')
})
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
    cleanup();
    server.resetHandlers()}
    )
// Clean up after the tests are finished.
afterAll(() => {
    server.close()
    console.log('Close msw server')
})
