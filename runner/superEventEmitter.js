const EventEmitter = require("events");
export default class SuperEventEmitter extends EventEmitter {
  on(eventName, fn) {
    super.on(eventName, fn);
    return () => {
      this.off(eventName, fn);
    };
  }
}
