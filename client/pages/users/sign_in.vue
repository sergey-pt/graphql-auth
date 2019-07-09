<template>
  <div class="container p-0">
    <AuthForm />
  </div>
</template>

<script>
import AuthForm from '~/components/AuthForm'

export default {
  middleware: 'check-auth-for-sign-in',

  components: {
    AuthForm
  }
}
</script>
