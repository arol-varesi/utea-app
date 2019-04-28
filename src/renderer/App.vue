<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    data: function () {
      return {
        versions:{electron:process.versions.electron,electronWebpack:require('electron-webpack/package.json').version}
      }
    },
  }
</script>


<style>

</style>
