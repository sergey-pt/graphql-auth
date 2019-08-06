import { gql } from 'apollo-boost'

export const GET_STORIES = gql`
  query($page: Int) {
    getStories(page: $page) {
      results {
        uuid
        title
        user {
          uuid
          username
        }
        updated_at
      }
      totalPages
      currentPage
    }
  }
`

export const UPDATE_STORY = gql`
  mutation($data: UpdateStoryInput!) {
    updateStory(data: $data) {
      uuid
      title
      updated_at
    }
  }
`

export const DELETE_STORY = gql`
  mutation($uuid: ID!) {
    deleteStory(uuid: $uuid) {
      uuid
      title
    }
  }
`
