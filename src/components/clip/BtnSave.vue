<template>
  <q-btn flat size="sm" color="teal" icon="save">
    <q-tooltip
      transition-show="scale"
      transition-hide="scale"
      anchor="top middle"
      self="center middle"
      content-class="bg-green-600"
    >
      save to archive
    </q-tooltip>
  </q-btn>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
