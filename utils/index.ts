export function throttle<T extends (...args: any[]) => void>(
  func: T,
  threshold: number = 250,
  scope?: any
): T {
  let last: number, deferTimer: any;
  return function (this: any) {
    let context = scope || this;

    let now = Date.now(),
      args = arguments;
    if (last && now < last + threshold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        func.apply(context, args);
      }, threshold);
    } else {
      last = now;
      func.apply(context, args);
    }
  } as T;
}

export function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}