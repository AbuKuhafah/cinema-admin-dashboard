import { createContext, useReducer, useContext } from 'react';

const initialState = {
  reviews: null,
  message: null,
};

const ReviewContext = createContext(initialState);

const reviewReducer = (state, action) => {
  switch (action.type) {
    case 'SET_REVIEWS':
      return { ...state, reviews: action.payload };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export const ReviewProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reviewReducer, initialState);

  return (
    <ReviewContext.Provider value={{ state, dispatch }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => {
  return useContext(ReviewContext);
};
