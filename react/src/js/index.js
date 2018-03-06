import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducersTodoApp from './reducersTodoApp';
import TodoApp from './TodoApp';

ReactDOM.render(
  <Provider store={createStore(reducersTodoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
