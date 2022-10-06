## redux
```js
const { createStore } = require('redux') 
const ADD = 'add'
const initState = { count: 0 }
function Counter(state = initState, action) {
  switch(action.type) {
    case ADD:
      return {  ...state, count: state.count + action.paload.count }
    default:
      return state
  }
}
const addOne = () => ({type: ADD, payload: { count: 1 }})
// store
const store = createStore(counter)
store.subscribe(() => console.log(store.getState()))
setInterval(() => store.dispatch(addOne()), 1000)
```

## mobox
```js
const { observable, autorun } = require('mobx')
const appState = observerable({
  counter: 0,
  add(value){ this.counter += value }
})
autorun(() => console.log(appState.counter))

```