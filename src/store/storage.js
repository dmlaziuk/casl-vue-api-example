export default (options) => (store) => {
  if (window.localStorage.state) {
    const storedState = JSON.parse(window.localStorage.state)
    store.replaceState(Object.assign(store.state, storedState))
  }

  return store.subscribe((mutation, state) => {
    if (options.destroyOn && options.destroyOn.indexOf(mutation.type) !== -1) {
      return window.localStorage.removeItem('state')
    }

    const newState = options.storedKeys.reduce((map, key) => {
      map[key] = state[key]
      return map
    }, {})

    window.localStorage.state = JSON.stringify(newState)
  })
}
