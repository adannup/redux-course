const expect = require('expect');
const deepFreeze = require('deep-freeze');

const toggleTodo = todo => {
  // Mutate de original object
  // todo.completed = !todo.completed;
  // return todo;

  // Dont mutate de original object, return a new array.
  // return Object.assign({}, todo, {
  //   completed: true,
  // });

  // spread operator ES7
  return {
    ...todo,
    completed: !todo.completed,
  }
}

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    test: 'Learn Redux',
    completed: false,
  };
  const todoAfter = {
    id: 0,
    test: 'Learn Redux',
    completed: true,
  };

  deepFreeze(todoBefore);

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
}

testToggleTodo();
console.log('All test passed');
