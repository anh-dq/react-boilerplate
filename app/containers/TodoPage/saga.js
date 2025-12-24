import { call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { ADD_TODO, DELETE_TODO, EDIT_TODO, LOAD_TODOS } from './constants';
import { loadTodos, todosLoaded, todosLoadingError } from './actions';

export function* getTodos() {
  const requestURL = `http://localhost:3001/todos`;

  try {
    const todos = yield call(request, requestURL);
    yield put(todosLoaded(todos));
  } catch (err) {
    yield put(todosLoadingError(err));
  }
}

export function* editTodo(action) {
  const requestURL = `http://localhost:3001/todos/${action.id}`;

  try {
    const todo = yield call(request, requestURL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.updatedTodo)
    });
    yield put(loadTodos());
  } catch (err) {
    yield put(todosLoadingError(err));
  }
}

export function* addTodo(action) {
  const requestURL = `http://localhost:3001/todos`;

  try {
    const todo = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: action.title })
    });
    yield put(loadTodos());
  } catch (err) {
    yield put(todosLoadingError(err));
  }
}

export function* deleteTodo(action) {
  const requestURL = `http://localhost:3001/todos/${action.id}`;

  try {
    const todo = yield call(request, requestURL, {
      method: 'DELETE',
    });
    yield put(loadTodos());
  } catch (err) {
    yield put(todosLoadingError(err));
  }
}

export default function* todoData() {
  yield takeLatest(LOAD_TODOS, getTodos);
  yield takeLatest(ADD_TODO, addTodo);
  yield takeLatest(DELETE_TODO, deleteTodo);
  yield takeLatest(EDIT_TODO, editTodo);
}