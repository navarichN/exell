import {capitalize} from './utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener `)
    }
    this.$root = $root;
    this.listeners = listeners
  }
  initDOMListeners() {
    // console.log(this.listeners, this.$root);
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(
            `Method ${method} is not implemented in ${name} Component`
        )
      }
      console.log(this)
      console.log(listener, this.$root)
      // Тоже самое, что и addEventListener
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])// bind насильно привязывает контекст
    })
  }
  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
