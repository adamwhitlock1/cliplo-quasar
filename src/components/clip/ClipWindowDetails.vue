<template>
  <p
    class="font-bold text-xs text-gray-500 flex items-center"
    v-if="getClipWindowData(item).hasData"
  >
    <q-icon size="xs" name="source" class="mr-1 text-gray-400" />
    {{ getClipWindowData(item).window }}
    <q-btn
      round
      flat
      color="blue-grey-4"
      icon="link"
      @click="open(item.window.url)"
      size="sm"
      v-if="item.window.url"
    >
      <q-tooltip
        transition-show="scale"
        transition-hide="scale"
        anchor="top middle"
        self="center middle"
        content-class="bg-blue-600"
      >
        {{ item.window.url }}
      </q-tooltip>
    </q-btn>
  </p>
</template>

<script>
import { openURL } from "quasar";
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    getClipWindowData(item) {
      if (item.window && item.window.owner) {
        const window = `${item.window.owner.name} ${
          item.window.title ? "|" : item.window.title
        } ${item.window.title}`;

        return {
          hasData: true,
          window: window.length > 90 ? `${window.substring(0, 80)}...` : window,
          url: item.window.url
        };
      }
      return {
        hadData: false,
        message: window.stdout
      };
    },
    open(url) {
      openURL(url);
    }
  }
};
</script>

<style></style>
