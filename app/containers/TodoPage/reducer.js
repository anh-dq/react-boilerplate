import produce from 'immer';
import { LOAD_TODOS, LOAD_TODOS_ERROR, LOAD_TODOS_SUCCESS } from './constants';

export const initialState = {
  todos: [],
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const todoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TODOS:
        draft.loading = true;
        draft.error = false;
        draft.todos = [];
        break;

      case LOAD_TODOS_SUCCESS:
        draft.todos = action.todos;
        draft.loading = false;
        break;

      case LOAD_TODOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default todoReducer;
