const REGISTER_MUTATION = `
mutation Register($options: UsernamePasswordInput!){
    register(options: $options) {
        user {
            id
            username
        }
        errors {
            field
            message
        }
    }
}
`
export default REGISTER_MUTATION;