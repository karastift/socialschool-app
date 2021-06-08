export default `
  mutation CreateGrade($input: GradeInput!) {
    createGrade(input: $input) {
      grade {
        id
        grade
        subject
        thoughts
        updatedAt
        createdAt
        creatorId
        creator {
          username
        }
      }
      errors {
        field
        message
      }
    }
  }`;