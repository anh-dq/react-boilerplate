import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from '../../components/Button';
import messages from './messages';


export function TodoListItemContent({
    todo,
    onDeleteTodo,
    onEditTodo,
}) {

    return (
        <div style={{
            display: 'flex',
            flex: 1,
            cursor: 'pointer'
        }} onClick={() => {
            onEditTodo(todo.id, {
                ...todo,
                completed: !todo.completed
            })
        }}>
            <div style={{
                textDecoration: todo.completed && 'line-through',
                flex: 1
            }}>{todo.title}</div>
            <Button onClick={(evt) => {
                evt.stopPropagation();
                onDeleteTodo(todo.id);
            }}>
                <FormattedMessage {...messages.deleteButtonLabel} />
            </Button>
        </div>
    );
}

export default TodoListItemContent;
