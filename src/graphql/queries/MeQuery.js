const ME_QUERY = `
{
    me {
        id
        createdAt
        updatedAt
        username
        school {
            schoolName
        }
    }
}
`;
export default ME_QUERY;