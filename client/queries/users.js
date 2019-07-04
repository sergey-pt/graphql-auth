import { gql } from 'apollo-boost'

export const SIGNIN_USER = gql`
  mutation($data: SignInUserInput!) {
    signinUser(
      data: $data
    ){
      user {
        uuid
        email
        username
      }
      token
    }
  }
`
