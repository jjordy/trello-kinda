import { TodoItem } from "lib/state";
import { useForm } from "react-hook-form";


export default function CreateTodoForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoItem>({
    defaultValues: {
      title: "",
      scheduleDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),
      priority: 1,
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <label htmlFor="id_title" className="block ml-0.5 font-medium text-gray-600 mb-1">
          Title
        </label>
        <input
          type="text"
          id="id_title"
          className="shadow rounded-xl w-full mb-2 p-2 font-medium"
          placeholder="Enter a task..."
          {...register("title", { required: true })}
        />
      </div>
      <div className="">
        <label htmlFor="id_scheduleDate" className="block ml-0.5 font-medium text-gray-600 mb-1">
          Scheduled Date
        </label>
        <input
          id="id_scheduleDate"
          type="date"
          className="shadow rounded-xl w-full mb-2 p-2 font-medium"
          placeholder="Scheduled Date"
          {...register("scheduleDate", { required: true })}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="id_dueDate" className="block ml-0.5 font-medium text-gray-600 mb-1">
          Due Date
        </label>
        <input
          type="date"
          placeholder="Due Date"
          id="id_dueDate"
          className="shadow rounded-xl w-full mb-2 p-2 font-medium"
          {...register("dueDate", { required: true })}
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-3 bg-green-500 text-white font-medium rounded-xl hover:bg-green-400 transition-all ease-in-out duration-75"
      >
        Add Task
      </button>
    </form>
  );
}
