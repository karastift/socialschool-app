const CREATE_GRADE_MUTATION = `
mutation CreateGrade($input: GradeInput!){
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
  }
`
export default CREATE_GRADE_MUTATION;