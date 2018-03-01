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

let nextTodoId = 0;
class TodoApp extends Component {
  onClickAddTodo = () => {
    store.dispatch({
      type: 'ADD_TODO',
      text: this.textInput.value,
      id: nextTodoId++,
    });

    this.textInput.value = '';
  }

  onClickToggleTodo = (id) => {
    store.dispatch({
      type: 'TOGGLE_TODO',
      id: id,
    });
  }

  render() {
    return (
      <div>
        <input type="text" ref={ input => { this.textInput = input; }} />
        <button onClick={this.onClickAddTodo}>Add Todo</button>
        <ul>
          {this.props.todos.map(todo => (
            <li
              key={todo.id}
              onClick={() => this.onClickToggleTodo(todo.id)}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}
            >
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      todos={store.getState().todos}
    />, document.getElementById('root'));
};

store.subscribe(render);
render();
