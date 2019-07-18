function compose(...funcs) {
  if(!funcs.length) return arg => arg;
  if(funcs.length === 1) return funcs[0];
  return funcs.reduce((prevFunc, currentFunc) => (...args) => prevFunc(currentFunc(...args)));
}