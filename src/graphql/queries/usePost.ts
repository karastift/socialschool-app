import { useQuery } from "urql";

type variables = {
  id: number;
}

export function usePost(variables: variables) {
  return useQuery({
    query: `
      query Post($id: Int!) {
        post(id: $id) {
          id
          createdAt
          updatedAt
          title
          text
          points
          status
          voteStatus
          creator {
            username
          }
        }
      }
    `,
    variables
  });
}