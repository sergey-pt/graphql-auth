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
