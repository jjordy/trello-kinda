import { useState } from "react";
import { useAtom } from "jotai";
import todoListState from "lib/state";
import shortid from "shortid";
import { useForm } from "react-hook-form";
import Input from "./Input";

export default function TodoItemCreator() {
  const [_, setTodoList] = useAtom(todoListState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isComplete: false,
      name: "",
      id: "",
    },
  });

  const addItem = (values) => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        ...values,
        id: shortid.generate(),
      },
    ]);
  };

  return (
    <div className="flex items-center mb-4">
      <form onSubmit={handleSubmit(addItem)} className="w-full flex items-start">
        <Input
          placeholder="What needs to be done?"
          data-cy="add-todo-input"
          error={errors?.name?.message}
          {...register("name", { required: { message: "Task name is required", value: true } })}
        />
        <div className="mr-2"></div>
        <div className="m-auto"></div>
        <button
          type="submit"
          data-cy="add-button"
          className="px-3 py-2.5 h-full bg-gray-300 rounded-lg shadow-xl text-gray-700 font-medium uppercase transition-all ease-in-out duration-200 hover:bg-gray-400"
        >
          Add
        </button>
      </form>
    </div>
  );
}
