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
          <div class="flex -mr-px">
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
          <div class="flex -mr-px">
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
      </li>
    </ul>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { createNamespacedHelpers } from 'vuex'
import { GET_CURRENT_USER } from '~/queries/users'
const { mapGetters } = createNamespacedHelpers('users')

export default {
  middleware: 'check-auth',

  data: () => ({
    username: '',
    email: '',
    password: '',
    storiesPage: 0,
    currentEditStory: ''
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

  async asyncData ({ app }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: GET_CURRENT_USER,
      fetchPolicy: 'no-cache'
    })

    return {
      username: data.getCurrentUser.username,
      email: data.getCurrentUser.email,
      stories: data.getCurrentUser.stories.results,
      storiesPage: data.getCurrentUser.stories.currentPage,
      storiesTotalPages: data.getCurrentUser.stories.total
    }
  },

  mounted() {
    this.$store.dispatch('users/clearUserErrors')
  },

  methods: {
    editStory(uuid) {
      this.currentEditStory = uuid
      this.$nextTick(() => {
        this.$refs[this.currentEditStory][0].focus()
      })
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
