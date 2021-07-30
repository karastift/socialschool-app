import { useQuery } from "urql";

type variables = {
  subject: string;
}

export function useSubjectGrades(variables: variables) {
  return useQuery({
    query: `
      query SubjectGrades($subject: String!) {
        subjectGrades(subject: $subject) {
          grade
          value
          createdAt
        }
      } 
    `,
    variables,
  });
}