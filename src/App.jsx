"use client"
import { useState, useEffect } from "react"
import "./App.css"
import TodoList from "./components/TodoList"


function App() {
  // Load todos from localStorage on initial render
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos")
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  const [inputValue, setInputValue] = useState("")

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }])
      setInputValue("")
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const editTodo = (id, newText) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-2xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                {/* Add Logo Here */}
                <div className="flex justify-center mb-6">
                  <img
                    src="Brain_Insight.png" // Replace with the path to your logo
                    alt="Todo App Logo"
                    className="h-30 w-auto" // Adjust size as needed
                  />
                </div>
                <h1 className="text-3xl font-extrabold text-center text-gray-900">Todo List</h1>
                <div className="flex">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="Add a new todo"
                  />
                  <button
                    onClick={addTodo}
                    className="px-4 py-2 text-white bg-cyan-500 rounded-r-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    Add
                  </button>
                </div>
                <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} editTodo={editTodo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App