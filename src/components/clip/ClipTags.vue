<template>
  <div class="flex flex-wrap items-center">
    <div v-for="(tag, index) in tags" :key="index">
      <q-icon
        v-if="tag.icon"
        class="text-gray-600 hover:text-gray-500 text-base ml-1"
        :name="tag.icon"
      >
        <q-tooltip
          transition-show="scale"
          transition-hide="scale"
          anchor="top middle"
          self="center middle"
          content-class="bg-gray-700"
        >
          {{ tag.label }}
        </q-tooltip>
      </q-icon>
      <div v-else-if="tag.svg">
        <div class="w-4 h-4 ml-1" v-html="tag.svg"></div>
        <q-tooltip
          transition-show="scale"
          transition-hide="scale"
          anchor="top middle"
          self="center middle"
          content-class="bg-gray-700"
        >
          {{ tag.label }}
        </q-tooltip>
      </div>
      <p class="text-xs text-gray-600 ml-1" v-else>{{ tag.label }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => [
        {
          format: ".js",
          icon: "fab fa-js",
          label: "JavaScript"
        }
      ]
    }
  }
};
</script>

<style></style>
