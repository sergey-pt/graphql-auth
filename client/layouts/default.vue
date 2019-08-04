<template>
  <div class="container p-0 xl:p-4">
    <Header />
    <div class="container mx-auto flex-col sm:block md:block lg:flex xl:flex pb-2">
      <div class="container p-0 pb-4">
        <hr>
      </div>
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
