<template>
  <div class="w-full max-w-xl container px-0">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      autocomplete="off"
      @submit.prevent="submitForm"
      @keyup.enter.prevent="submitForm"
    >
      <div
        v-if="formType !== 'signIn'"
        class="mb-4"
      >
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
        >
        <p
          v-if="submitted && $v.username.$error"
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
        >
        <p
          v-if="submitted && $v.email.$error"
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
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          v-model="password"
          type="password"
          :class="inputClass('password')"
          placeholder="Password"
          @keypress="resetUserError('password')"
        >
        <p
          v-if="submitted && $v.password.$error"
          class="text-red-500 text-xs italic mt-3"
        >
          <span v-if="!$v.password.required">Password is required</span>
        </p>
        <p
          v-if="passwordError"
          class="text-red-500 text-xs italic mt-3"
        >
          <span>{{ passwordError.message }}</span>
        </p>
        <div
          v-if="authError && formType === 'signIn'"
          class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mt-3"
          role="alert"
        >
          <p class="font-bold">
            Please try again
          </p>
          <p>{{ authError.message }}</p>
        </div>
      </div>
      <div
        v-if="formType === 'signIn'"
        class="flex items-center justify-between"
      >
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click.prevent="siginUser"
        >
          Sign In
        </button>
        <n-link
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          to="/users/sign_up"
        >
          Sign Up
        </n-link>
      </div>
      <div
        v-if="formType === 'signUp'"
        class="flex items-center justify-between"
      >
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click.prevent="createUser"
        >
          Sign Up
        </button>
        <n-link
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          to="/users/sign_in"
        >
          Sign In
        </n-link>
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs">
      © 2019
    </p>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('users')

export default {
  props: {
    formType: {
      default: 'signIn',
      type: String
    }
  },

  data: () => ({
    username: '',
    email: '',
    password: '',
    submitted: false
  }),

  computed: {
    ...mapGetters(['isAuthenticated', 'authError', 'userErrors']),

    inputClass() {
      return (field) => {
        let baseClass = 'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none'

        if (this.submitted && this.$v[field].$error) {
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

  validations () {
    if (this.formType === 'signIn') {
      return {
        email: { required, email },
        password: { required }
      }
    } else if (this.formType === 'signUp') {
      return {
        email: { required, email },
        password: { required },
        username: { required }
      }
    }
  },

  mounted() {
    this.$store.dispatch('users/clearUserErrors')
  },

  methods: {
    submitForm() {
      if (this.formType === 'signIn') {
        this.siginUser()
      } else if (this.formType === 'signUp') {
        this.createUser()
      }
    },

    resetUserError(key) {
      this.$store.dispatch('users/resetUserError', key)
    },

    async createUser() {
      this.submitted = true

      // stop here if form is invalid
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      await this.$store.dispatch('users/createUser', {
        username: this.username,
        email: this.email,
        password: this.password
      })

      if (this.isAuthenticated) {
        this.$router.push('/users/profile')
      }
    },

    async siginUser() {
      this.submitted = true

      // stop here if form is invalid
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      await this.$store.dispatch('users/authenticateUser', {
        email: this.email,
        password: this.password
      })

      if (this.isAuthenticated) {
        this.$router.push('/users/profile')
      }
    }
  }
}
</script>
