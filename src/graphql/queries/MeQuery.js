const ME_QUERY = `
{
    me {
        id
        username
        email
        school {
            schoolName
        }
    }
}
`;
export default ME_QUERY;