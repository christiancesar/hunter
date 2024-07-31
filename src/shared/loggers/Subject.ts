import { LogDetails, Observer } from "./Observer";

export class Subject {
  private observers: Observer[] = [];

  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    }
  }

  public notifyObservers(logDetails: LogDetails): void {
    this.observers.forEach((observer) => observer.notify(logDetails));
  }
}
