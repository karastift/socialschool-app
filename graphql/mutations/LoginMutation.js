const LOGIN_MUTATION = `
mutation Login($username: String!, $password: String!) {
    login(options: { username: $username, password: $password }) {
        user {
            id
            createdAt
            updatedAt
            username
        }
        errors {
            field
            message
        }
    }
}
`;
export default LOGIN_MUTATION;