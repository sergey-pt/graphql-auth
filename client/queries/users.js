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
  query($storiesPage: Int) {
    getCurrentUser(storiesPage: $storiesPage) {
      uuid
      email
      username
      created_at
      stories {
        results {
          uuid
          title
          created_at
        }
        total
        currentPage
      }
    }
  }
`
