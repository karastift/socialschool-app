import { useQuery } from "urql";

export function useAllGrades() {
  return useQuery({
    query: `
      {
        allGrades {
          grade
          createdAt
          value
        }
      }
    `
  });
}