import React from 'react'
import Todo from './Todo'
import { queryByRole } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import Button from "./Button";
import { render, screen, fireEvent, within } from '@testing-library/react'
import Board from "./Board";

//###################################

//###################################
//////////////////////////////////////

///////
test('todo contains test description', ()=>{
      //const todoAttribute = { description: "Hello" }
      const{getByText} =render(<Todo
      todo={{description: "Hallo"}}
    onDelete={()=>console.log("delete")}
    onAdvance={()=>console.log()}/>)
    expect(getByText("Hallo")).toBeInTheDocument()
    }
    )
//////

test('todo contains button name',() => {
  const { getByText, getByRole } = render(<Todo
      todo={{description: "Hello" }}
      onDelete = {() => console.log("delete")}
      onAdvance = {() => console.log("advance")}/>)
  expect(getByText("Hello")).toBeInTheDocument()
  expect(getByRole("button",{name: /Delete/})).toBeInTheDocument()
} )

///////////
test('todo delete button function test', () => {
  const handleClick = jest.fn()
  render(<Todo
      todo={{description: "Hello" }}
      onDelete = {handleClick}
      onAdvance = {() => console.log("advance")}/>)
  fireEvent.click(screen.getByText(/Delete/i))
  expect(handleClick).toHaveBeenCalledTimes(1)
})

///////////
// ///
it('snapshot test todo', () => {
  //GIVEN
  const todo = {
    id: '1234',
    description: 'Hallo',
  }

  //WHEN
  const tree = renderer
    .create(
      <Todo
        todo={todo}
        onAdvance={() => console.log('Advanced')}
        onDelete={() => console.log('On Delete')}
      />
    )
    .toJSON()

  // THEN
  expect(tree).toMatchSnapshot()
})

//////


////
test('checks that description is in Todo', () => {
  //GIVEN
  const todo = {
    id: '1',
    description: 'code',
    status: 'IN_PROGRESS',
  }
  const { getByText } = render(<Todo {...todo} />)

  //WHEN
  const actual = getByText(/code/i)

  //THEN
  expect(actual).toBeInTheDocument()
})

test('checks that status is in Todo', () => {
  //GIVEN
  const todo = {
    id: '1',
    description: 'code',
    status: 'IN_PROGRESS',
  }
  const { getByText } = render(<Todo {...todo} />)

  //WHEN
  const actual = getByText(/IN_PROGRESS/i)

  //THEN
  expect(actual).toBeInTheDocument()
})

test('checks that advance button IS shown when status is OPEN', () => {
  //GIVEN
  const todo = {
    id: '1',
    description: 'code',
    status: 'OPEN',
  }
  const { getByRole } = render(<Todo {...todo} />)

  //WHEN
  const button = getByRole('button', { name: /advance/i })

  //THEN
  expect(button).toBeInTheDocument()
})

test('checks that advance button IS NOT shown when status is DONE', () => {
  //GIVEN
  const todo = {
    id: '1',
    description: 'code',
    status: 'DONE',
  }
  const { queryByRole } = render(<Todo {...todo} />)

  //WHEN
  const button = queryByRole('button', { name: /advance/i })

  //THEN
  expect(button).not.toBeInTheDocument()
})

test('checks that NO buttons are shown when showButtons is FALSE', () => {
  //GIVEN
  const todo = {
    id: '1',
    description: 'code',
    status: 'DONE',
  }
  const { queryByRole } = render(<Todo {...todo} showButtons={false} />)

  //WHEN
  const button = queryByRole('button')

  //THEN
  expect(button).not.toBeInTheDocument()
})

test('checks that on advance is called with todos data', () => {
  //GIVEN
  const todo = {
    id: '1',
    description: 'code',
    status: 'OPEN',
  }
  const onAdvance = jest.fn()
  const { queryByRole } = render(<Todo {...todo} onAdvance={onAdvance} />)

  //WHEN
  const button = queryByRole('button', { name: /advance/i })
  userEvent.click(button)

  //THEN
  expect(onAdvance).toHaveBeenCalledWith(todo)
})

test('check the behaviour of the delete button', () => {
  //GIVEN
  const history = createMemoryHistory()
  const todo = {
    id: '1',
    description: 'code',
    status: 'OPEN',
  }
  const { queryByText } = render(
    <Router history={history}>
      <Todo {...todo} />
    </Router>
  )

  //WHEN
  const button = queryByText(/delete/i)
  userEvent.click(button)

  //THEN
  expect(history.location.pathname).toBe('/delete/1')
})
