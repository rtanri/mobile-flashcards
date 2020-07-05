const logger = (store) => (next) => (action) => {

    console.group(action.type);
    console.log('The action: ', action);
  
    //by passing the next(action) the the actions in will update the state.
    const returnValue = next(action);
    console.log('The new state: ', store.getState());
  
    console.log('returnValue', returnValue);
    console.groupEnd();
    return returnValue;
  };
  
  export default logger; 