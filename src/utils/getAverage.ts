import { GradeTypes } from "../types/GradeTypes";

export const getAverage = (array: [GradeTypes]) => {
  let sum = 0;
  array.map((grade) => {
      sum += grade.grade;
  });
  return (sum / array.length).toFixed(2);
};