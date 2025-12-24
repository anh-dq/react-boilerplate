import { ADD_TODO, DELETE_TODO, EDIT_TODO, LOAD_TODOS, LOAD_TODOS_ERROR, LOAD_TODOS_SUCCESS } from './constants';

export function loadTodos() {
  return {
    type: LOAD_TODOS,
  };
}

export function todosLoaded(todos) {
  return {
    type: LOAD_TODOS_SUCCESS,
    todos
  };
}

export function todosLoadingError(error) {
  return {
    type: LOAD_TODOS_ERROR,
    error,
  };
}

export function editTodo(id, updatedTodo) {
  return {
    type: EDIT_TODO,
    id,
    updatedTodo
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    id,
  };
}

export function addTodo(title) {
  return {
    type: ADD_TODO,
    title
  };
}