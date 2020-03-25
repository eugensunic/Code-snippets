// algorithm decription taken from second answer: 
// https://stackoverflow.com/questions/13483430/how-to-make-rounded-percentages-add-up-to-100


/*Rounding everything down
Getting the difference in sum and 100
Distributing the difference by adding 1 to items in decreasing order of their decimal parts
*/


const arr = [19 / 138, 121 / 138]

function equalizePercentageToHundred(arr) {
  let percentageArr = arr.map(x => x * 100);
  let totalPercentageSum = percentageArr.reduce((acc, x) => acc + Math.round(x), 0);
  
  const sortByDecimalValue = percentageArr.map(x => ({
    decimal: x % 1,
    integer: Math.round(x)
  })).sort((a, b) => {
    if (a.decimal > b.decimal) return -1
    if (a.decimal < b.decimal) return 1
    return 0
  })

  console.log("sortByDecimalValue", sortByDecimalValue);

  const adjustIntegers = sortByDecimalValue.reduce((acc, x) => {
    let val;
    if (totalPercentageSum > 100) {
      val = x.integer - 1;
      totalPercentageSum -= 1;
    }
    if (totalPercentageSum < 100) {
      val = x.integer + 1;
      totalPercentageSum += 1;
    }
    acc = [...acc, {
      decimal: x.decimal,
      integer: val,
    }];
    return acc;
  }, []).map(x => ({
    integer: x.integer
  }))

  console.log('adjustIntegers', adjustIntegers)
}

equalizePercentageToHundred(arr)

