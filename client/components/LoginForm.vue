<template>
  <div class='w-full max-w-xl container'>
    <form class='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' autocomplete='off' @submit.prevent='siginUser'>
      <div class='mb-4'>
        <label class='block text-gray-700 text-sm font-bold mb-2' for='username'>
          Email
        </label>
        <input v-model='email' class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='email' placeholder='Email' autocomplete='off'>
      </div>
      <div class='mb-6'>
        <label class='block text-gray-700 text-sm font-bold mb-2' for='password'>
          Password
        </label>
        <input v-model='password' class='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' type='password' placeholder='Password'>
        <p class='text-red-500 text-xs italic'>Please choose a password.</p>
      </div>
      <div class='flex items-center justify-between'>
        <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button' @click.prevent='siginUser'>
          Sign In
        </button>
        <a class='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800' href='#'>
          Forgot Password?
        </a>
      </div>
    </form>
    <p class='text-center text-gray-500 text-xs'>
      © 2019
    </p>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: ''
  }),

  methods: {
    async siginUser() {
      await this.$store.dispatch('users/authenticateUser', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
