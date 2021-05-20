const POST_COMMENT_QUERY = `
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
`;
export default POST_COMMENT_QUERY;