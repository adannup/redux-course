import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from './actions';

let AddTodo = ({ dispatch }) => {
  let textInput;
  return (
    <div>
      <input type="text" ref={ input => { textInput = input; }} />
      <button onClick={() => {
        dispatch(addTodo(textInput.value));
        textInput.value = '';
      }}>Add Todo</button>
    </div>
  );
};

AddTodo = connect()(AddTodo);

export default AddTodo;
