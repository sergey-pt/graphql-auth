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

export const CREATE_USER = gql`
  mutation($data: CreateUserInput!) {
    createUser(
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

export const UPDATE_USER = gql`
  mutation($data: UpdateUserInput!) {
    updateUser(
      data: $data
    ){
      uuid
      email
      username
    }
  }
`

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      uuid
      email
      username
      created_at
      stories {
        uuid
        title
        created_at
      }
    }
  }
`
