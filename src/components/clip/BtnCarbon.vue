<template>
  <q-btn
    flat
    size="sm"
    color="accent"
    icon="share"
    @click="openLink(createCarbonLink(item.text))"
  >
    <q-tooltip
      transition-show="scale"
      transition-hide="scale"
      anchor="top middle"
      self="center middle"
      content-class="bg-purple-600"
    >
      share via carbon.now.sh
    </q-tooltip>
  </q-btn>
</template>

<script>
import { shell } from "electron";
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    createCarbonLink(text) {
      return encodeURI(`https://carbon.now.sh/?code=${text}`);
    },
    openLink(target) {
      shell.openExternal(target);
    }
  }
};
</script>

<style></style>
