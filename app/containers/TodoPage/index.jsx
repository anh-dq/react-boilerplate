import React, { useState } from 'react';
import H1 from 'components/H1';
import { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import TodosList from '../../components/TodosList';
import { loadTodos, addTodo } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectTodos,
} from './selectors';
import TodoInputWrapper from './TodoInputWrapper';
import Input from './TodoInput';
import Button from '../../components/Button';

const key = 'todo';

export function TodoPage({
  todos,
  loading,
  error,
  onLoadTodos,
  onAddTodo
}) {
  const [inputTodo, setInputTodo] = useState('');
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onLoadTodos()
  }, []);

  const reposListProps = {
    loading,
    error,
    todos,
  };

  return (
    <article>
      <Helmet>
        <title>Todo Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <TodoInputWrapper>
          <Input
            id="todo"
            type="text"
            value={inputTodo}
            onChange={(evt) => {
              setInputTodo(evt.target.value);
            }}
          />

          <Button onClick={() => {
            if (!inputTodo) return;

            onAddTodo(inputTodo);
            setInputTodo('');
          }}>
            <FormattedMessage {...messages.buttonLabel} />
          </Button>
        </TodoInputWrapper>
        <TodosList {...reposListProps} />
      </div>
    </article>
  );
}

const mapStateToProps = createStructuredSelector({
  todos: makeSelectTodos(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadTodos: () => dispatch(loadTodos()),
    onAddTodo: (title) => dispatch(addTodo(title)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TodoPage);
