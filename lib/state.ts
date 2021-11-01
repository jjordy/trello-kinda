import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { parseISO, isToday, isTomorrow, differenceInDays, isPast } from "date-fns";
import update from "immutability-helper";

export interface TodoItem {
  id: string;
  title: string;
  scheduleDate: string;
  dueDate: string;
  priority: 1 | 2 | 3;
}

const todoListState = atomWithStorage<Record<string, TodoItem>>("todo_list", {});

const todosAsArray = atom((get) => {
  const todos = get(todoListState);
  return Object.keys(todos).map(k => ({ ...todos[k] }))
});

export const reorderTodos = atom(null, (get, set, u: any) => {
  const todos = get(todosAsArray);
  const item = todos[u.dragIndex];
  const data = update(todos, {
    $splice: [
      [u.dragIndex, 1],
      [u.hoverIndex, 0, item],
    ],
  });
  const obj = data.reduce((acc, curr) => {
    acc[curr.id] = curr
    return acc;
  }, {});
  console.log(obj)
  return set(todoListState, obj);
})

export const backlog = atom((get) => {
  const todos = get(todosAsArray);
  if (Array.isArray(todos)) {
    return todos.filter((todoItem) => {
      const todayMidnight = new Date();
      todayMidnight.setHours(0, 0, 0, 0); 
      if (isPast(parseISO(todoItem.scheduleDate))) {
        if (differenceInDays(todayMidnight, parseISO(todoItem.scheduleDate)) > 0) {
          return true;
        }
      }
      if (!todoItem.scheduleDate) {
        return true;
      }
      return false;
    });
  }
});

export const todaysTodos = atom((get) => {
  const todos = get(todosAsArray);
  if (Array.isArray(todos)) {
    return todos.filter((todoItem) => isToday(parseISO(todoItem.scheduleDate)));
  }
});

export const tomorrowsTodos = atom((get) => {
  const todos = get(todosAsArray);
  if (Array.isArray(todos)) {
    return todos.filter((todoItem) => isTomorrow(parseISO(todoItem.scheduleDate)));
  }
});

export const futureTodos = atom((get) => {
  const todos = get(todosAsArray);
  if (Array.isArray(todos)) {
    return todos.filter(
      (todoItem) => {
        const todayMidnight = new Date();
        todayMidnight.setHours(0, 0, 0, 0)
        if (differenceInDays(parseISO(todoItem.scheduleDate), todayMidnight) >= 2) {
          return true;
        }
        return false;
      }
    );
  }
});

export default todoListState;
