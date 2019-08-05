<template>
  <div>
    <ul>
      <li
        v-for="story in stories"
        :key="story.uuid"
        class="py-2"
      >
        <div
          v-if="currentEditStory == story.uuid"
          class="flex flex-wrap items-stretch w-full xl:w-6/12 relative"
        >
          <input
            :ref="story.uuid"
            :value="story.title"
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
            @focusout="currentEditStory = ''"
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
              focus:outline-none
              focus:bg-green-500"
            >
              Save
            </button>
            <button
              class="flex
              items-center
              leading-tight
              bg-red-400
              hover:bg-red-500
              rounded
              rounded-l-none
              border
              border-l-0
              border-red-500
              px-3
              whitespace-no-wrap
              text-white
              text-sm
              focus:outline-none
              focus:bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
        <div
          v-else
          class="flex flex-wrap items-stretch w-full xl:w-6/12 relative"
        >
          <input
            :value="story.title"
            readonly
            type="text"
            class="flex-shrink
            flex-grow
            flex-auto
            flex-1
            focus:outline-none
            leading-tight
            w-px
            border
            border-r-0
            border-white
            py-2
            px-3
            relative
            cursor-default"
            placeholder="Story Title"
          >
          <div
            v-if="story.user.uuid == userUuid"
            class="flex -mr-px"
          >
            <button
              class="flex
              items-center
              leading-tight
              bg-white
              border
              border-white
              px-3
              whitespace-no-wrap
              text-green-500
              text-sm
              focus:outline-none
              focus:text-green-700"
              @click="editStory(story.uuid)"
            >
              Edit
            </button>
            <button
              class="flex
              items-center
              leading-tight
              bg-white
              border
              border-l-0
              border-white
              px-3
              whitespace-no-wrap
              text-red-500
              text-sm
              focus:outline-none
              focus:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
        <p class="text-xs md:text-sm font-normal text-gray-600 px-3 py-1">
          {{ story.updated_at | moment("dddd, MMMM Do YYYY") }}
          <span v-if="showAuthors">
            <i>by</i>
            <span class="font-semibold">{{ story.user.username }}</span>
          </span>
        </p>
      </li>
    </ul>
    <div
      v-if="
        pageCount
          > 1"
      class="w-full flex my-auto py-5 items-center justify-center md:items-start md:justify-start text-xs md:text-base"
    >
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="changePage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'flex list-reset border border-grey-light rounded w-auto font-sans'"
        :page-class="'hover:bg-gray-100'"
        :prev-class="'hover:bg-gray-100'"
        :next-class="'hover:bg-gray-100'"
        :page-link-class="'block text-gray-700 border-r border-grey-light px-3 py-2 focus:outline-none'"
        :prev-link-class="'block text-gray-700 border-r border-grey-light px-3 py-2 focus:outline-none'"
        :next-link-class="'block text-gray-700 px-3 py-2 focus:outline-none'"
        :break-view-link-class="'focus:outline-none'"
        :active-class="'bg-gray-200 hover:bg-gray-200'"
        :hide-prev-next="true"
      />
      </span></span></p></span></span>
      </li></span></span></p>
      </ul>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Paginate from '~/node_modules/vuejs-paginate/src/components/Paginate'
const { mapGetters } = createNamespacedHelpers('users')

export default {
  components: {
    Paginate
  },

  props: {
    stories: {
      type: Array,
      required: true
    },
    pageCount: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    showAuthors: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    page: 0,
    currentEditStory: ''
  }),

  computed: {
    ...mapGetters(['userUuid'])
  },

  mounted: function() {
    this.page = this.currentPage
  },

  methods: {
    changePage(page) {
      this.$emit('change-stories-page', page)
    },

    editStory(uuid) {
      this.currentEditStory = uuid
      this.$nextTick(() => {
        this.$refs[this.currentEditStory][0].focus()
      })
    },
  },

}
</script>
