const POST_QUERY = `
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
`;
export default POST_QUERY;