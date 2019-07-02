<template>
  <div class="w-full max-w-xl container">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      autocomplete="off"
      @submit.prevent="siginUser"
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Email
        </label>
        <input
          v-model="email"
          :class="inputClass('email')"
          type="email"
          placeholder="Email"
          autocomplete="off"
        >
        <p
          v-if="submitted && $v.email.$error"
          class="text-red-500 text-xs italic mt-3"
        >
          <span v-if="!$v.email.required">Email is required</span>
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
        >
        <p
          v-if="submitted && $v.password.$error"
          class="text-red-500 text-xs italic mt-3"
        >
          <span v-if="!$v.password.required">Password is required</span>
        </p>
        <div
          v-if="authError"
          class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mt-3"
          role="alert"
        >
          <p class="font-bold">
            Please try again
          </p>
          <p>{{ authError.message }}</p>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click.prevent="siginUser"
        >
          Sign In
        </button>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Sign Up
        </a>
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
  data: () => ({
    email: '',
    password: '',
    submitted: false
  }),

  computed: {
    ...mapGetters(['authError']),

    inputClass() {
      return (field) => {
        let baseClass = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'

        if (this.submitted && this.$v[field].$error) {
          baseClass = baseClass.concat(' border-red-500')
        }

        return baseClass
      }
    }
  },

  validations: {
    email: { required, email },
    password: { required }
  },

  methods: {
    async siginUser() {
      this.submitted = true

      // stop here if form is invalid
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log(this.$v.password)
        return
      }

      await this.$store.dispatch('users/authenticateUser', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
