import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const { createStore, combineReducers } = require('redux');

const todo = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          id: action.id,
          text: action.text,
          completed: false,
        };
      case 'TOGGLE_TODO':
        if(state.id === action.id) {
          return Object.assign({}, state, { completed: !state.completed });
          // return {
          //   ...state,
          //   completed: !state.completed,
          // }
        }
        return state;
      default:
        return state;
    }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  };
};

const todoApp = combineReducers({
  todos,
  visibilityFilter,
});
const store = createStore(todoApp);

const Link = ({ active, children, onClick }) => {
  if(active) {
    return <span>{children}</span>
  }
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
}

class FilterLink extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onClickHandleFilter = () => {
    store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: this.props.filter,
    });
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={this.onClickHandleFilter}
      >
        {props.children}
      </Link>
    );
  }
}

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
    >
      All
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_ACTIVE'
    >
      Active
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_COMPLETED'
    >
      Completed
    </FilterLink>
  </p>
);

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none'}}
  >
    {text}
  </li>
);

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        // completed={todo.completed}
        // text={todo.text}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

const AddTodo = () => {
  let textInput;
  return (
    <div>
      <input type="text" ref={ input => { textInput = input; }} />
      <button onClick={() => {
        store.dispatch({
            type: 'ADD_TODO',
            text: textInput.value,
            id: nextTodoId++,
          });
        textInput.value = '';
      }}>Add Todo</button>
    </div>
  );
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
  }
}

class VisibleTodoList extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onClickToggleTodo = (id) => {
    store.dispatch({
      type: 'TOGGLE_TODO',
      id,
    });
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <TodoList
        todos={getVisibleTodos(state.todos, state.visibilityFilter)}
        onTodoClick={this.onClickToggleTodo}
      />
    )
  }
}

let nextTodoId = 0;
const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

ReactDOM.render(<TodoApp/>, document.getElementById('root'));
