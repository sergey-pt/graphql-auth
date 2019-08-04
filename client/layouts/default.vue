<template>
  <div class="container p-0 xl:p-4">
    <Header />
    <div class="container mx-auto sm:block md:block lg:flex xl:flex py-4">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header'

export default {
  components: {
    Header
  }
}
</script>
