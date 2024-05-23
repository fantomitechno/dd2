class Queue<T> {
  readonly action: (el: T) => any;
  readonly queue: T[];
  readonly time: number;

  private working = false;
  private intervale: NodeJS.Timeout | null = null;

  constructor(action: (el: T) => any, queue: T[] = [], time: number = 1000) {
    this.action = action;
    this.queue = queue;
    this.time = time;
  }

  add = (element: T) => {
    this.queue.push(element);

    if (!this.working) {
      this.working = true;
      this.intervale = setInterval(() => {
        if (this.queue.length == 0) {
          clearInterval(this.intervale!);
          this.intervale = null;
          this.working = false;
        }
        else this.action(this.queue.shift()!);
      }, this.time);
    };
  }


  public get running(): boolean {
    return this.intervale != null;
  }
}

export { Queue };
