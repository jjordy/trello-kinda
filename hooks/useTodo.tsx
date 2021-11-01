import { useAtom } from "jotai";
import todoListState, { backlog, futureTodos, todaysTodos, tomorrowsTodos, reorderTodos } from "lib/state";
import { useCallback } from "react";
import update from "immutability-helper";
import shortid from "shortid";

export default function useTodo() {
  const [todoList, setTodoList] = useAtom(todoListState);
  const [bLog] = useAtom(backlog);
  const [today] = useAtom(todaysTodos);
  const [tom] = useAtom(tomorrowsTodos);
  const [future] = useAtom(futureTodos);
  const [, reorder] = useAtom(reorderTodos)
  const handleMove = useCallback(
    (dragIndex, hoverIndex) => {
      const id = Object.keys(todoList)[dragIndex];
      const hover = Object.keys(todoList)[hoverIndex];
      const dragItem = todoList[id];
      reorder({ dragIndex, hoverIndex })
    },
    [todoList]
  );
  const handleAddTodo = useCallback(
    (todoItem) => {
      const id = shortid();
      const payload = { ...todoList, [id]: { id, ...todoItem } };
      setTodoList(payload);
    },
    [todoList]
  );
  const handleUpdateTodo = useCallback(
    (todoItem) => {
      const item = todoList[todoItem.id];
      setTodoList({ ...todoList, [todoItem.id]: { ...item, ...todoItem,  } });
    },
    [todoList]
  );

  return {
    todoList,
    backlog: bLog,
    today,
    tomorrow: tom,
    future,
    handleMove,
    handleAddTodo,
    handleUpdateTodo,
  };
}
