import { useQuery } from "urql";

type variables = {
  limit: number;
  postId: number;
  cursor: string | null;
}

export function usePostComments(variables: variables) {
  return useQuery({
    query: `
      query PostComments($limit: Int!, $postId: Int! $cursor: String){
        postComments(limit: $limit, postId: $postId, cursor: $cursor) {
          postComments {
            id
            creator {
              username
            }
            text
          }
          hasMore
        }
      }
    `,
    variables
  });
}