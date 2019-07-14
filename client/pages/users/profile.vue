<template>
  <div class="container p-0">
    <h2>🚀 My Profile</h2>
    <form
      class="pt-6 pb-8 mb-4 w-6/12"
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
    <h2>🗂 My Stories</h2>
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
    password: ''
  }),

  computed: {
    ...mapGetters(['userErrors']),

    inputClass() {
      return (field) => {
        let baseClass = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'

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
      email: data.getCurrentUser.email
    }
  },

  mounted() {
    this.$store.dispatch('users/clearUserErrors')
  },

  methods: {
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
