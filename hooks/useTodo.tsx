import { useAtom } from "jotai";
import todoListState, { backlog, futureTodos, todaysTodos, tomorrowsTodos } from "lib/state";
import { useCallback } from "react";
import update from "immutability-helper";
import shortid from "shortid";

export default function useTodo() {
  const [todoList, setTodoList] = useAtom(todoListState);
  const [bLog] = useAtom(backlog);
  const [today] = useAtom(todaysTodos);
  const [tom] = useAtom(tomorrowsTodos);
  const [future] = useAtom(futureTodos);
  const handleMove = useCallback((dragIndex, hoverIndex) => {
    const dragItem = todoList[dragIndex];
    setTodoList(
      update(todoList, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem],
        ],
      })
    );
  }, [todoList]);
  const handleAddTodo = useCallback(
    (todoItem) => {
      setTodoList(
        update(todoList, {
          $push: [{  ...todoItem, id: shortid() }],
        })
      );
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
    handleAddTodo
  };
}
