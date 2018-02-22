// This example was made from here: https://egghead.io/lessons/react-redux-react-counter-example

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Counter from './Counter';

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);

const App = () => {
  return (
    <React.Fragment>
      <h1> Hola mundo test</h1>
      <Counter
        value={store.getState()}
        onIncrement={() =>
          store.dispatch({
            type: 'INCREMENT',
          })
        }
        onDecrement={() =>
          store.dispatch({
            type: 'DECREMENT',
          })
        }
      />
    </React.Fragment>
  );
}

const render = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
