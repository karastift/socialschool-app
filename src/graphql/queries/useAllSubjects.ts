import { useQuery } from "urql";

export function useAllSubjects() {
  return useQuery({
    query: `
      {
        allSubjects
      }
    `
  });
}