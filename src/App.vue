<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { ipcRenderer } from "electron";
import { mapActions } from "vuex";
export default {
  name: "App",
  created() {
    this.seedOptions(this.$db);
    this.stream(this.$db);
    ipcRenderer.on("newClipAdded", () => {
      this.stream(this.$db);
    });
  },
  methods: {
    ...mapActions("user", ["seedOptions"]),
    ...mapActions("clip", ["stream"])
  }
};
</script>

<style>
@tailwind base;

@tailwind components;

@tailwind utilities;
</style>
