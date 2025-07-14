class Queue<T> {
  readonly action: (el: T) => any;
  readonly queue: T[];
  readonly time: number;

  constructor(action: (el: T) => any, queue: T[] = [], time: number = 1000) {
    this.action = action;
    this.queue = queue;
    this.time = time;
    setInterval(() => {
      if (this.queue.length > 0) this.action(this.queue.shift()!);
    }, this.time);
  }

  add = (element: T) => {
    this.queue.push(element);
  };
}

export { Queue };
