
// input data
const pets = [
  { type: "Dog", name: "Spot" },
  { type: "Cat", name: "Tiger" },
  { type: "Dog", name: "Rover" },
  { type: "Cat", name: "Leo" }
];

// first approach
const result = pets.reduce((acc, x) => {
  return {
    ...acc,
    [x.type]: acc[x.type] ? [...acc[x.type], x.name] : [x.name]
  }
}, {});

// second approach
const result = pets.reduce((acc, x) => ({
  ...acc,
  [x.type]: [...(acc[x.type] || []), x.name]
}), {});


// third approach
const result = pets.reduce((acc, x) => {
  if (!acc[x.type]) {
    acc[x.type] = [x.name];
  } else {
    acc[x.type].push(x.name)
  }
  return acc;
}, {});


