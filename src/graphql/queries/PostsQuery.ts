const POSTS_QUERY = `
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
  
`;
export default POSTS_QUERY;