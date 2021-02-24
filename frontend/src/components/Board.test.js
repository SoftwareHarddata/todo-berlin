import React from 'react'
import Todo from './Todo'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, within } from '@testing-library/react'
import Board from "./Board";

/*import { queryByRole } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import renderer from 'react-test-renderer'*/

//###################################

const testTodos=[
    {
        "id": "976f37f4-8aa7-481d-ad2c-2120613f3347",
        "description": "Write tests",
        "status": "OPEN"
    },
    {
        "id": "61084198-b1b7-4d7c-837c-62f458ce765a",
        "description": "Drink coffee",
        "status": "IN_PROGRESS"
    },
    {
        "id": "4f5cf145-d5f7-430f-8e0e-048ea3c1fc68",
        "description": "Buy milk",
        "status": "DONE"
    }
]
///#1
test('todo contains button name',() => {
    const { getByText, getByRole } = render(<Board
        todos={testTodos}
        title={"Todo"}
        onDelete = {() => console.log("delete")}
        onAdvance = {() => console.log("advance")}/>)

    const list = screen.getByRole("list", {

        name: /fruits/i,

    })

    const { getAllByRole } = within(list)

    const items = getAllByRole("listitem")

    expect(items.length).toBe(3)
} )

/////////////////////////// #2
it("should render list of descriptions in a specific order", async () => {

    const {} = render(<Board
        todos={testTodos}
        title={"Todo"}
        onDelete = {() => console.log("delete")}
        onAdvance = {() => console.log("advance")}/>)

    // <ul aria-label="fruits">
    const list = screen.getByRole("list", {

        name: /fruits/i,

    })

    const { getAllByRole } = within(list)

    const items = getAllByRole("listitem")

    const toDoDescriptions = items.map(item => item.textContent)

    expect(toDoDescriptions).toEqual([

        "Write testsDeleteAdvance",
        "Drink coffeeDeleteAdvance",
        "Buy milkDeleteAdvance",

    ])

})

///////////////#3
test('Test list of todos by their descriptions', () => {

        const {getByRole} = render(<Board todos={testTodos}
                                          title={"OPEN"}
                                          onDelete = {() => console.log("delete")}
                                          onAdvance = {() => console.log("advance")}/>)
        const list = screen.getByRole("list", {name: /fruits/i, })
        const { getAllByRole} = within(list)
        expect(getAllByRole("listitem")).toHaveLength(3)
        expect(getByRole("heading",{level: 2})).toHaveTextContent("OPEN")
    }
)