const CREATE_POST_MUTATION = `
mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      post {
        id
        createdAt
        updatedAt
        title
        text
        status
        points
        creatorId
      }
      errors {
        field
        message
      }
    }
  }
`
export default CREATE_POST_MUTATION;