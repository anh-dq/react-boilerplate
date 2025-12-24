import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTodo = state => state.todo || initialState;

const makeSelectTodos = () =>
  createSelector(
    selectTodo,
    todoState => todoState.todos,
  );

const makeSelectLoading = () =>
  createSelector(
    selectTodo,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectTodo,
    globalState => globalState.error,
  );

export { selectTodo, makeSelectTodos, makeSelectLoading, makeSelectError };
