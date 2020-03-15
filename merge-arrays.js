
// data example
const input = [{
  a: 1,
  b: 2,
  c: [{
    x: 10,
    y: 20
  }, {
    x: 30,
    y: 40
  }]
}, {
  a: 3,
  b: 4,
  c: [{
    x: 50,
    y: 60
  }, {
    x: 70,
    y: 80
  }]
}]

// using flatmap
const result = input.flatMap(x => x.c.map(y => ({
  a: x.a,
  b: x.b,
  x: y.x,
  y: y.y
})));

console.log(result)


// using reduce
const input = [{
  a: 1,
  b: 2,
  c: [{
    x: 10,
    y: 20
  }, {
    x: 30,
    y: 40
  }]
}, {
  a: 3,
  b: 4,
  c: [{
    x: 50,
    y: 60
  }, {
    x: 70,
    y: 80
  }]
}]

const result = input.reduce((acc_0, x) => {
  return [...acc_0, ...x.c.reduce((acc_1, y) => {
    const obj = {
      a: x.a,
      b: x.b,
      x: y.x,
      y: y.y
    }
    acc_1.push(obj);
    return acc_1;
  }, [])]
}, []);

console.log(result)
