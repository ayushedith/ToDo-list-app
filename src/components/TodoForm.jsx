import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    if (!todo.completed) {
      toggleComplete(todo.id);
    }
  };

  return (
    <div className={`flex border rounded-lg px-3 py-1.5 gap-x-3 shadow-md duration-300  text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}>
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-gray-500 px-2" : "border-transparent"} ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className={`inline-flex w-8 h-8 rounded-lg text-sm border justify-center items-center bg-gray-300 hover:bg-gray-400 shrink-0 ${todo.completed ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => {
          if (isTodoEditable) {
            editTodo();
          } else {
            setIsTodoEditable(true);
          }
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className={`inline-flex w-8 h-8 rounded-lg text-sm border justify-center items-center bg-gray-300 hover:bg-gray-400 shrink-0 ${todo.completed ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => deleteTodo(todo.id)}
        disabled={todo.completed}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
