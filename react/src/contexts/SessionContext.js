import { createContext, useReducer, useContext } from 'react';

const initialState = {
  session: null,
  message: null,
};

const SessionContext = createContext(initialState);

const sessionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SESSIONS':
      return { ...state, session: action.payload };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export const SessionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  return (
    <SessionContext.Provider value={{ state, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  return useContext(SessionContext);
};
