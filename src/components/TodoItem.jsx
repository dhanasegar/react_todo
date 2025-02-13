"use client"

import { useState } from "react"

function TodoItem({ todo, deleteTodo, toggleTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    editTodo(todo.id, editText)
    setIsEditing(false)
  }

  return (
    <li className="flex items-center space-x-2 bg-white p-2 rounded shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="form-checkbox h-5 w-5 text-cyan-500"
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      ) : (
        <span className={`flex-1 ${todo.completed ? "line-through text-gray-400" : ""}`}>{todo.text}</span>
      )}
      {isEditing ? (
        <button
          onClick={handleEdit}
          className="px-2 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="px-2 py-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Edit
        </button>
      )}
      <button
        onClick={() => deleteTodo(todo.id)}
        className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Delete
      </button>
    </li>
  )
}

export default TodoItem

