import React, { useReducer, createContext } from "react";

export default (reducer, actions, defaultValue) => {
  const Context = createContext();

  const Provider = ({ children }) => {
    const [recipesState, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = {};

    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ recipesState, ...boundActions,dispatch }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};