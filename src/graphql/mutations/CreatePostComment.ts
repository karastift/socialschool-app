const CREATE_POST_COMMENT_MUTATION = ` mutation CreatePostComment($postId: Int!, $text: String!){
    createPostComment(postId: $postId, text: $text) {
        postComment {
            id
            postId
            text
        }
        errors {
            message
            field
        }
    }
  }`

export default CREATE_POST_COMMENT_MUTATION;