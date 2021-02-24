import { useEffect, useState } from 'react'
import AddNewTodo from './components/AddNewTodo'
import AppHeader from './components/AppHeader'
import Boards from './components/Boards'
import PageLayout from './components/PageLayout'
import { advanceStatus } from './services/advanceStatus'
import * as todoApi from './services/todoApi'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TodoDetails from "./components/TodoDetails";

export default function App() {
  const [todos, setTodos] = useState([])

  function saySomething() {
    return <h1>i am a Todo</h1>;
  }

  useEffect(() => {
    todoApi.getTodos().then((loadedTodos) => setTodos(loadedTodos))
  }, [])

  const addTodo = (description) => {
    const newTodoDto = { description, status: 'OPEN' }
    todoApi.postTodo(newTodoDto).then((newTodo) => {
      const updatedTodos = [...todos, newTodo]
      setTodos(updatedTodos)
    })
  }

  const deleteTodo = (todoToDelete) => {
    todoApi.deleteTodo(todoToDelete).then(() => {
      const updatedTodos = todos.filter((todo) => todo.id !== todoToDelete.id)
      setTodos(updatedTodos)
    })
  }

  const advanceTodo = (todoToAdvance) => {
    const advancedTodo = {
      ...todoToAdvance,
      status: advanceStatus(todoToAdvance.status),
    }
    todoApi.putTodo(advancedTodo).then((updatedTodo) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
      setTodos(updatedTodos)
    })
  }

  return (
      <Router>
        <Switch>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Route exact path="/">
            <PageLayout>
              <AppHeader />
              <Boards todos={todos} onDelete={deleteTodo} onAdvance={advanceTodo} />
              <AddNewTodo onAdd={addTodo} />
              <Link to="/todo">Todo</Link>
            </PageLayout>
          </Route>

          <Route path="/todo/:id">
            <TodoDetails/>
          </Route>

          <Route path="/todo">
          <TodoDetails/>
        </Route>

      </Switch>
      </Router>
  )
}
