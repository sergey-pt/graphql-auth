<template>
  <div class="container p-0">
    <AuthForm form-type="signUp" />
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
