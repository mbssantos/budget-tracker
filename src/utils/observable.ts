export type Observer = () => void;

/**
 * General purpose Observable pattern implementation
 */
class Observable {
  private observers: Observer[] = [];

  subscribe(subscriber: Observer) {
    this.observers.push(subscriber);
  }

  unsubscribe(subscriber: Observer) {
    const index = this.observers.indexOf(subscriber);
    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  }

  notify() {
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i]();
    }
  }
}

export default Observable;
