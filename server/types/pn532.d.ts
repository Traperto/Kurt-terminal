export const I2C_ADDRESS: number;
declare class PN532 {
  static defaultMaxListeners: any;
  static init(): void;
  static listenerCount(emitter: any, type: any): any;
  static usingDomains: boolean;
  constructor(hal: any, options: any);
  pollInterval: any;
  hal: any;
  frameEmitter: any;
  addListener(type: any, listener: any): any;
  authenticateBlock(uid: any, options: any): any;
  configureSecureAccessModule(): any;
  emit(type: any, args: any): any;
  eventNames(): any;
  getFirmwareVersion(): any;
  getGeneralStatus(): any;
  getMaxListeners(): any;
  listenerCount(type: any): any;
  listeners(type: any): any;
  off(type: any, listener: any): any;
  on(type: any, listener: any): any;
  once(type: any, listener: any): any;
  prependListener(type: any, listener: any): any;
  prependOnceListener(type: any, listener: any): any;
  rawListeners(type: any): any;
  readBlock(options: any): any;
  readNdefData(): any;
  removeAllListeners(type: any, ...args: any[]): any;
  removeListener(type: any, listener: any): any;
  scanTag(): any;
  sendCommand(commandBuffer: any): any;
  setMaxListeners(n: any): any;
  writeBlock(block: any, options: any): any;
  writeNdefData(data: any): any;
}
declare namespace PN532 {
  class EventEmitter {
    // Circular reference from pn532.PN532.EventEmitter
    static EventEmitter: any;
    static defaultMaxListeners: any;
    static init(): void;
    static listenerCount(emitter: any, type: any): any;
    static usingDomains: boolean;
    addListener(type: any, listener: any): any;
    emit(type: any, args: any): any;
    eventNames(): any;
    getMaxListeners(): any;
    listenerCount(type: any): any;
    listeners(type: any): any;
    off(type: any, listener: any): any;
    on(type: any, listener: any): any;
    once(type: any, listener: any): any;
    prependListener(type: any, listener: any): any;
    prependOnceListener(type: any, listener: any): any;
    rawListeners(type: any): any;
    removeAllListeners(type: any, ...args: any[]): any;
    removeListener(type: any, listener: any): any;
    setMaxListeners(n: any): any;
  }
}
