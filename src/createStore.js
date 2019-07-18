function createStore(reducer, preloadedState) {
  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = [];
  let nextListeners = currentListeners;

  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    currentListeners.push(listener);
    return function unsubscribe() {
      const removeIndex = nextListeners.indexOf(listener);
      nextListeners.splice(removeIndex, 1);
      currentListeners = null;
    }
  }
  function dispatch(action) {
    const listeners = (currentListeners = nextListeners);
    try {
      currentState = currentReducer(currentState, action);
    } catch (error) {
      
    }
    for(let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
    return action;
  }
}