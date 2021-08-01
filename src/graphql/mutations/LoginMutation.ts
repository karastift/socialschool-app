const LOGIN_MUTATION = `
mutation Login($usernameOrEmail: String!, $password: String!, $school: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password, school: $school) {
      user {
        id
        username
        school {
          schoolName
        }
      }
      errors {
        field
        message
      }
    }
  }
`;
export default LOGIN_MUTATION;