const SUBJECT_GRADES_QUERY = `
query SubjectGrades($subject: String!){
    subjectGrades(subject: $subject) {
        grade
        createdAt
        }
    }
`;

export default SUBJECT_GRADES_QUERY;