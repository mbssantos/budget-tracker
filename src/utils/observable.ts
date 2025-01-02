export type Subscriber<T> = (param: T) => void;

/**
 * General purpose Observable pattern implementation
 */
class Observable<T = void> {
  private entries: Subscriber<T>[] = [];

  constructor() {}

  subscribe(subscriber: Subscriber<T>) {
    this.entries.push(subscriber);
  }

  unsubscribe(subscriber: Subscriber<T>) {
    const index = this.entries.indexOf(subscriber);
    if (index >= 0) {
      this.entries.splice(index, 1);
    }
  }

  notify(param: T) {
    for (let index = 0; index < this.entries.length; index++) {
      this.entries[index](param);
    }
  }

  count() {
    return this.entries.length;
  }
}

export default Observable;
