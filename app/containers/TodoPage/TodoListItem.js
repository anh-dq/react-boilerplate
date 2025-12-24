import React from 'react';
import ListItem from 'components/ListItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTodo, editTodo } from './actions';
import { TodoListItemContent } from './TodoListItemContent';

export function TodoListItem(props) {
    const { item, onDeleteTodo, onEditTodo } = props;

    const content = (
        <TodoListItemContent todo={item} onDeleteTodo={onDeleteTodo} onEditTodo={onEditTodo} />
    );

    return <ListItem key={`to-list-item-${item.title}`} item={content} />;
}

TodoListItem.propTypes = {
    item: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
    return {
        onEditTodo: (id, updatedTodo) => dispatch(editTodo(id, updatedTodo)),
        onDeleteTodo: (id) => dispatch(deleteTodo(id))
    };
}

export default connect(
    null,
    mapDispatchToProps,
)(TodoListItem);

