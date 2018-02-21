// Pure functions
const square = x => x * x;
const squareAll = items => items.map(square);

// Test
console.log(square(5));
console.log(squareAll([2,3,4,5]));

// Impure functions
const square = x => {
  updateXInDatabase(x);
  return x * x;
}

const squareAll = items => {
  for (let i = 0; i < items.length; i++) {
    items[i] = square(items[i]);
  }
}
