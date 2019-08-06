<template>
  <div>
    <div
      v-if="isAuthenticated"
      class="flex flex-wrap items-stretch w-full xl:w-6/12 relative pb-2"
    >
      <input
        v-model="newStory.title"
        type="text"
        class="flex-shrink
            flex-grow
            flex-auto
            flex-1
            focus:outline-none
            leading-tight
            w-px
            py-2
            px-3
            border
            border-r-0
            border-grey-light
            rounded
            rounded-r-none
            relative"
        placeholder="Story Title"
        @keyup.enter="createStory"
      >
      <div
        class="flex -mr-px"
      >
        <button
          class="flex
              items-center
              leading-tight
              bg-green-400
              hover:bg-green-500
              border
              border-green-500
              px-3
              whitespace-no-wrap
              text-white
              text-sm
              focus:outline-none"
          @click="createStory"
        >
          Add Story
        </button>
      </div>
    </div>
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
import { createNamespacedHelpers } from 'vuex'
import { GET_STORIES, CREATE_STORY } from '~/queries/stories'
import StoriesList from '~/components/StoriesList'
const { mapGetters } = createNamespacedHelpers('users')

export default {
  components: {
    StoriesList
  },

  data: () => ({
    newStory: {
      title: ''
    }
  }),

  computed: {
    ...mapGetters(['isAuthenticated']),
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
    async createStory() {
      const { data } = await this.$apollo.mutate({
        mutation: CREATE_STORY,
        variables: {
          data: {
            title: this.newStory.title
          }
        }
      })

      this.stories.pop()
      this.stories.unshift(data.createStory)
      this.newStory = {}
    },

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
