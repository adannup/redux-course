const deepFreeze = require('deep-freeze');
const expect = require('expect');

const addCounter = list => {
  // Mutate de original array
  // list.push(0);
  // return list;

  // Dont mutate de original array, return a new array.
  // return list.concat([0]);
  return [...list, 0]; // ES6
};

const removeCounter = (list, index) => {
  // Mutate de original array
  // list.splice(index, 1);
  // return list;

  // Dont mutate de original array, return a new array.
  // return list.slice(0, index).concat(list.slice(index + 1));
  return [...list.slice(0, index), ...list.slice(index + 1)]; // ES6
};

const incrementCounter = (list, index) => {
  // Mutate de original array
  // list[index]++;
  // return list;

  // Dont mutate de original array, return a new array.
  // return list.slice(0, index).concat([list[index] + 1]).concat(list.slice(index + 1));
  return [...list.slice(0, index), list[index] + 1, ...list.slice(index + 1)] // ES6
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
};

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter);
};

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  deepFreeze(listBefore);

  expect(
    incrementCounter(listBefore, 1)
  ).toEqual(listAfter);
};

testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log('All test passed');
