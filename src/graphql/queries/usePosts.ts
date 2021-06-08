import { useQuery } from "urql";

type postsVariables = {
  limit: number;
  cursor: null | string;
}

export function usePosts(variables: postsVariables) {
  return useQuery({
    query: `
      query Posts($limit: Int!, $cursor: String) {
        posts(limit: $limit, cursor: $cursor) {
          hasMore
          posts {
            id
            createdAt
            updatedAt
            title
            textSnippet
            points
            status
            creator {
              username
            }
          }
        }
      }
    `,
    variables
  });
}