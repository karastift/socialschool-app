import { Grade } from "../types/Grade";

export const getAverage = (array: Grade[]) => {
  
  if (array.every(({ value }) => value === array[0].value)) {
    const sum = array.reduce((sum, curr) => sum + curr.grade, 0);
    return (sum / array.length).toFixed(2);
  }

  let values: number[] = [];
  array.map(({ value }) => {
    if (!values.includes(value)) values.push(value);
  });

  let gradesByValues: any = {};

  for (let val of values) {
    gradesByValues[val] = array.filter(({ value }) => value === val);
  }
  let average = 0;

  for (let val of Object.keys(gradesByValues)) {
    let sum = gradesByValues[val].reduce((a: number, { grade }: Grade) => a + grade, 0);
    average += (sum / gradesByValues[val].length) * parseFloat(val);
  }
  return average.toFixed(2);
};