// this is type alias
export type Cb = () => void;
//
export class Eventing {
  events: { [key: string]: Cb[] } = {};

  // on == addEventListener
  public on = (eventName: string, cb: Cb): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(cb);
    this.events[eventName] = handlers;
  };

  public trigger = (eventName: string): void => {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) return;

    handlers.forEach(cb => {
      cb();
    });
  };
}
