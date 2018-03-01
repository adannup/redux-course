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

class FilterLink extends Component {
  onClickHandleFilter = e => {
    e.preventDefault();
    this.props.onClick(this.props.filter);
  }

  render() {
    if(this.props.filter === this.props.currentFilter) {
      return <span>{this.props.children}</span>
    }
    return (
      <a
        href="#"
        onClick={this.onClickHandleFilter}
      >
        {this.props.children}
      </a>
    );
  }
}

const Footer = ({ visibilityFilter, onFilterClick }) => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      All
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_ACTIVE'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Active
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_COMPLETED'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
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

const AddTodo = ({ onAddClick }) => {
  let textInput;
  return (
    <div>
      <input type="text" ref={ input => { textInput = input; }} />
      <button onClick={() => {
        onAddClick(textInput.value);
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

let nextTodoId = 0;
class TodoApp extends Component {
  onClickAddTodo = text => {
    store.dispatch({
      type: 'ADD_TODO',
      text,
      id: nextTodoId++,
    });
  }

  onClickToggleTodo = (id) => {
    store.dispatch({
      type: 'TOGGLE_TODO',
      id: id,
    });
  }

  onClickFilter = filter => {
    store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter,
    });
  }

  render() {
    const { todos, visibilityFilter } = this.props;
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);

    return (
      <div>
        <AddTodo onAddClick={this.onClickAddTodo} />
        <TodoList
          todos={visibleTodos}
          onTodoClick={this.onClickToggleTodo}
        />
        <Footer
          visibilityFilter={visibilityFilter}
          onFilterClick={this.onClickFilter}
        />
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      // todos={store.getState().todos}
      {...store.getState()}
    />, document.getElementById('root'));
};
store.subscribe(render);
render();
