export default `
  mutation CreateGrade($input: GradeInput!) {
    createGrade(input: $input) {
      grade {
        id
      }
      errors {
        field
        message
      }
    }
  }`;