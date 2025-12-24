import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.TodoPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Todos',
  },
  buttonLabel: {
    id: `${scope}.button.label`,
    defaultMessage: 'Add todo',
  },
  deleteButtonLabel: {
    id: `${scope}.button.delete.label`,
    defaultMessage: 'Delete todo',
  },
});
