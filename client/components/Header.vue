<template>
  <div class="container flex bg-white h-16 items-center">
    <div class="w-full max-w-screen-xl relative mx-auto px-6">
      <div class="flex justify-between flex-row items-center -mx-6">
        <div class="flex flex-row items-center">
          <n-link
            class="mr-6"
            to="/"
          >
            <h1>GraphQL Auth</h1>
          </n-link>
        </div>
        <div
          v-if="isAuthenticated"
          class="flex justify-start items-center text-gray-500"
        >
          <n-link
            class="block flex items-center hover:text-gray-700 mr-6"
            to="/users/profile"
          >
            {{ userEmail }}
          </n-link>
          <a
            href="#"
            class="block flex items-center hover:text-gray-700"
            to="/users/logout"
            @click.prevent="logoutUser"
          >
            Logout
            </n-link>
          </a>
        </div>
        <div
          v-else
          class="flex justify-start items-center text-gray-500"
        >
          <n-link
            class="block flex items-center hover:text-gray-700 mr-6"
            to="/users/sign_in"
          >
            Sign In
          </n-link>
          <n-link
            class="block flex items-center hover:text-gray-700"
            to="/users/sign_up"
          >
            Sign Up
          </n-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('users')

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'userEmail'])
  },

  methods: {
    async logoutUser() {
      await this.$store.dispatch('users/logoutUser')

      this.$router.push('/')
    }
  }
}
</script>
