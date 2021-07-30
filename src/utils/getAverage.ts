import { GradeTypes } from "../types/GradeTypes";

export const getAverage = (array: GradeTypes[]) => {
  
  let val = array[0].value;

  if (array.every(({ value }) => value === val)) {
    let sum = 0;
    array.map((grade) => {
      sum += grade.grade;
    });

    return (sum / array.length).toFixed(2);
  }

  let values: number[] = [];
  array.map(({ value }) => {
    if (!values.includes(value)) values.push(value);
  });

  let gradesByValues: any = {};

  for (val of values) {
    gradesByValues[val] = array.filter(({ value }) => value === val);
  }
  let average = 0;

  for (let val of Object.keys(gradesByValues)) {
    let sum = gradesByValues[val].reduce((a: number, { grade }: any) => a + grade, 0);
    average += (sum / gradesByValues[val].length) * parseFloat(val);
  }
  return average.toFixed(2);
};