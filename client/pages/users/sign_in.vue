<template>
  <div class="container p-0">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '~/components/LoginForm'

export default {
  middleware: 'check-auth-for-sign-in',

  components: {
    LoginForm
  }
}
</script>
