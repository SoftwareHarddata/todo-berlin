import {render, screen, waitFor} from '@testing-library/react'
import App from './App'
// test/LoginForm.test.js
import '@testing-library/jest-dom'
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import userEvent from '@testing-library/user-event'



    const server = setupServer(
        rest.get('/api/todo', (req,
                               res, ctx) => {
            // Respond with a mocked user token that gets persisted
            // in the `sessionStorage` by the `Login` component.
            const body = [
                {
                    "id": "1",
                    "description": "one",
                    "status": "OPEN"
                },
                {
                    "id": "2",
                    "description": "two",
                    "status": "IN_PROGRESS"
                }
            ];
            const bodyAsJson = ctx.json(body);
            return res(bodyAsJson)
        })
    )

// Enable API mocking before tests.
    beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
    afterAll(() => server.close())

    test('render all todos from backend', async () => {
            render(<App/>)

            await waitFor(() => screen.getByText('one', {exact: false}))

            const firstTodoElement = screen.getByText('one', {exact: false})
            expect(firstTodoElement).toBeInTheDocument()

        })
