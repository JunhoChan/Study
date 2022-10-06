/**
 * @description Event off on emit once
 */

class JEvent {
  constructor() {
    this._event = {}
  }
  _isFunction(listener) {
    return typeof listener === "function"
  }
  _addEventListener(eventName, lisnter) {
    if (!this._event[eventName]) {
      this._event[eventName] = []
    }
    this._event[eventName].push(lisnter)
  }
  _removeEventListener(eventName, lisnter) {
    if (!this._event[eventName]
      || !this._event[eventName].length) return false
    let matchListenerIndex = -1
    for (let i = 0; i < this._event[eventName].length; i++) {
      if (this._event[eventName][i] === lisnter) {
        matchListenerIndex = i
      }
    }
    this._event[eventName].splice(matchListenerIndex, 1)
  }
  on(eventName, listener) {
    this._addEventListener(eventName, listener)
  }
  off(eventName, listener) {
    this._removeEventListener(eventName, listener)
  }
  emit(eventName, ...value) {
    const listeners = this._event[eventName]
    for (let i = 0; i < listener.length; i++) {
      listeners[i].apply(this, [...value])
    }
  }
  once(eventName, listener) {
    const wrap = (...rest) => {
      listener.apply(this, [...rest])
      this.off(eventName, listener)
    }
    this.on(eventName, wrap)
  }
}