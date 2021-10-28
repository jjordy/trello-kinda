import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { parseISO, isToday, isTomorrow, differenceInDays, isPast } from "date-fns";

export interface TodoItem {
  id: string;
  title: string;
  scheduleDate: string;
  dueDate: string;
  priority: 1 | 2 | 3;
}

const todoListState = atomWithStorage<TodoItem[]>("todo_list", []);

export const backlog = atom((get) => {
  const todos = get(todoListState);
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
  const todos = get(todoListState);
  if (Array.isArray(todos)) {
    return todos.filter((todoItem) => isToday(parseISO(todoItem.scheduleDate)));
  }
});

export const tomorrowsTodos = atom((get) => {
  const todos = get(todoListState);
  if (Array.isArray(todos)) {
    return todos.filter((todoItem) => isTomorrow(parseISO(todoItem.scheduleDate)));
  }
});

export const futureTodos = atom((get) => {
  const todos = get(todoListState);
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
