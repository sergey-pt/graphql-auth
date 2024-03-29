<template>
  <div class="container p-0">
    <h2 class="pb-4">
      🚀 My Profile
    </h2>
    <form
      class="xl:w-6/12 pb-2"
      autocomplete="off"
      @submit.prevent="submitForm"
      @keyup.enter.prevent="submitForm"
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          v-model="username"
          :class="inputClass('username')"
          type="text"
          placeholder="Username"
          autocomplete="off"
          @keypress="resetUserError('username')"
          @blur="updateUser"
        >
        <p
          v-if="$v.username.$invalid"
          class="text-red-500 text-xs italic mt-3"
        >
          <span v-if="!$v.username.required">Username is required</span>
        </p>
        <p
          v-if="usernameError"
          class="text-red-500 text-xs italic mt-3"
        >
          <span>{{ usernameError.message }}</span>
        </p>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="email"
        >
          Email
        </label>
        <input
          v-model="email"
          :class="inputClass('email')"
          type="email"
          placeholder="Email"
          autocomplete="off"
          @keypress="resetUserError('email')"
          @blur="updateUser"
        >
        <p
          v-if="$v.email.$invalid"
          class="text-red-500 text-xs italic mt-3"
        >
          <span v-if="!$v.email.required">Email is required</span>
          <span v-if="!$v.email.email">Invalid email</span>
        </p>
        <p
          v-if="emailError"
          class="text-red-500 text-xs italic mt-3"
        >
          <span>{{ emailError.message }}</span>
        </p>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Password
        </label>
        <input
          v-model="password"
          :class="inputClass('password')"
          type="password"
          placeholder="Password"
          autocomplete="off"
          @keypress="resetUserError('password')"
          @blur="updateUser"
        >
        <p
          v-if="passwordError"
          class="text-red-500 text-xs italic mt-3"
        >
          <span>{{ passwordError.message }}</span>
        </p>
      </div>
    </form>

    <hr>
    <h2 class="py-4">
      🗂 My Stories
    </h2>

    <StoriesList
      :stories="stories"
      :page-count="storiesTotalPages"
      :current-page="storiesPage"
      @change-stories-page="changeStoriesPage"
      @delete-story="deleteStory"
    />
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { createNamespacedHelpers } from 'vuex'
import { GET_CURRENT_USER } from '~/queries/users'

import StoriesList from '~/components/StoriesList'
const { mapGetters } = createNamespacedHelpers('users')

export default {
  middleware: 'check-auth',

  components: {
    StoriesList
  },

  data: () => ({
    username: '',
    email: '',
    password: ''
  }),

  computed: {
    ...mapGetters(['userErrors']),

    inputClass() {
      return (field) => {
        let baseClass = 'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none'

        if (this.$v[field].$invalid) {
          baseClass = baseClass.concat(' border-red-500')
        }

        if (this[`${field}Error`]) {
          baseClass = baseClass.concat(' border-red-500')
        }

        return baseClass
      }
    },

    usernameError() {
      return this.userErrors.find((error) => {
        return error.code === 'VALIDATION_ERROR' && error.key === 'username'
      })
    },

    emailError() {
      return this.userErrors.find((error) => {
        return error.code === 'VALIDATION_ERROR' && error.key === 'email'
      })
    },

    passwordError() {
      return this.userErrors.find((error) => {
        return error.code === 'VALIDATION_ERROR' && error.key === 'password'
      })
    }
  },

  async asyncData ({ app, query }) {
    const page = parseInt(query.storiesPage) || 1
    const { data } = await app.apolloProvider.defaultClient.query({
      query: GET_CURRENT_USER,
      variables: {
        storiesPage: page
      },
      fetchPolicy: 'no-cache'
    })

    return {
      username: data.getCurrentUser.username,
      email: data.getCurrentUser.email,
      stories: data.getCurrentUser.stories.results,
      storiesPage: data.getCurrentUser.stories.currentPage,
      storiesTotalPages: data.getCurrentUser.stories.totalPages
    }
  },

  mounted() {
    this.$store.dispatch('users/clearUserErrors')
  },

  methods: {
    async changeStoriesPage(page) {
      this.$router.push({
        query: { storiesPage: page }
      })

      const { data } = await this.$apollo.query({
        query: GET_CURRENT_USER,
        variables: {
          storiesPage: page
        },
        fetchPolicy: 'no-cache'
      })

      this.stories = data.getCurrentUser.stories.results
      this.storiesPage = data.getCurrentUser.stories.currentPage
    },

    async deleteStory() {
      const { data } = await this.$apollo.query({
        query: GET_CURRENT_USER,
        variables: {
          storiesPage: parseInt(this.$route.query.storiesPage) || 1
        },
        fetchPolicy: 'no-cache'
      })

      this.stories = data.getCurrentUser.stories.results
      this.storiesPage = data.getCurrentUser.stories.currentPage
      this.storiesTotalPages = data.getCurrentUser.stories.totalPages
    },

    resetUserError(key) {
      this.$store.dispatch('users/resetUserError', key)
    },

    async updateUser() {
      // stop here if form is invalid
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      await this.$store.dispatch('users/updateUser', {
        username: this.username,
        email: this.email,
        password: this.password
      })
    }
  },

  validations: {
    email: { required, email },
    password: { required },
    username: { required }
  },
}
</script>
