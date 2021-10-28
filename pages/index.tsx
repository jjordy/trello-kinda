import useTodo from "hooks/useTodo";
import Head from "next/head";
import { useState } from "react";
import CreateTodoForm from "shared/CreateTodoForm";
import { Modal } from "shared/Modal";
import TodoItem from "shared/TodoItem";
import TodoListSurface from "shared/TodoListSurface";

export default function IndexPage() {
  const [showAddTodo, setShowAddTodo] = useState(false);
  const { backlog, future, today, tomorrow, handleMove, handleAddTodo } = useTodo();
  return (
    <>
      <Head>
        <title>Kinda Like Trello</title>
      </Head>
      <div className="px-4 md:px-0 container mx-auto">
        <div className="flex min-h-screen">
          <div className="w-full md:px-16">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-white my-8 mr-8">Todo List</h1>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-3xl"
                onClick={() => setShowAddTodo(true)}
              >
                Create Todo
              </button>
            </div>
            <hr className="my-4" />
            <div className="grid grid-cols-4 gap-8">
              <TodoListSurface>
                <div className="bg-gray-200 rounded-3xl shadow-xl p-4">
                  {backlog?.map((todoItem, idx) => (
                    <TodoItem
                      todoItem={todoItem}
                      index={idx}
                      moveItem={handleMove}
                      key={`backlog_todo_item_${idx}`}
                    />
                  ))}
                </div>
                <div className="bg-gray-200 rounded-3xl shadow-xl p-4">
                  {today?.map((todoItem, idx) => (
                    <TodoItem
                      todoItem={todoItem}
                      key={`today_todo_item_${idx}`}
                      index={idx}
                      moveItem={handleMove}
                    />
                  ))}
                </div>
                <div className="bg-gray-200 rounded-3xl shadow-xl p-4">
                  {tomorrow?.map((todoItem, idx) => (
                    <TodoItem
                      todoItem={todoItem}
                      key={`tomorrow_todo_item_${idx}`}
                      index={idx}
                      moveItem={handleMove}
                    />
                  ))}
                </div>
                <div className="bg-gray-200 rounded-3xl shadow-xl p-4">
                  {future?.map((todoItem, idx) => (
                    <TodoItem
                      todoItem={todoItem}
                      key={`future_todo_item_${idx}`}
                      index={idx}
                      moveItem={handleMove}
                    />
                  ))}
                </div>
              </TodoListSurface>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showAddTodo} onClose={() => setShowAddTodo(false)}>
        <h4 className="my-2 text-xl font-medium text-gray-600">Create Task</h4>
        <CreateTodoForm onSubmit={handleAddTodo} />
      </Modal>
    </>
  );
}
