<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  created() {
    this.seedOptions(this.$db);
  },
  methods: {
    ...mapActions("user", ["seedOptions"])
  }
};
</script>

<style>
@tailwind base;

@tailwind components;

@tailwind utilities;
</style>
