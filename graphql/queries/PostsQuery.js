const POSTS_QUERY = `
{
    posts {
    id
    createdAt
    updatedAt
    title
    }
    me {
        id
        createdAt
        updatedAt
        username
    }
}
`;
export default POSTS_QUERY;