<template>
  <div>
    <StoriesList
      :stories="stories"
      :page-count="storiesTotalPages"
      :current-page="storiesPage"
      :show-authors="true"
      @change-stories-page="changeStoriesPage"
      @delete-story="deleteStory"
    />
  </div>
</template>

<script>
import { GET_STORIES } from '~/queries/stories'
import StoriesList from '~/components/StoriesList'

export default {
  components: {
    StoriesList
  },

  async asyncData ({ app, query }) {
    const page = parseInt(query.page) || 1
    const { data } = await app.apolloProvider.defaultClient.query({
      query: GET_STORIES,
      variables: {
        page
      },

      fetchPolicy: 'no-cache'
    })

    return {
      stories: data.getStories.results,
      storiesPage: data.getStories.currentPage,
      storiesTotalPages: data.getStories.totalPages
    }
  },

  methods: {
    async changeStoriesPage(page) {
      this.$router.push({
        query: { page }
      })

      const { data } = await this.$apollo.query({
        query: GET_STORIES,
        variables: {
          page
        },
        fetchPolicy: 'no-cache'
      })

      this.stories = data.getStories.results
      this.storiesPage = data.getStories.currentPage
    },

    async deleteStory() {
      const { data } = await this.$apollo.query({
        query: GET_STORIES,
        variables: {
          page: parseInt(this.$route.query.page) || 1
        },
        fetchPolicy: 'no-cache'
      })

      this.stories = data.getStories.results
      this.storiesPage = data.getStories.currentPage
      this.storiesTotalPages = data.getStories.totalPages
    },
  }
}
</script>
