<template>
  <div id="app">
    {{msg}}
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      wut: "HALO (here's a Vue test)"
    }
  },
  computed: {
    msg () {
      return this.wut
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
</style>
