<template>
  <div>
    <transition-group name="flip-list" leave-active-class="animated zoomOut">
      <div
        v-for="(item, index) in items"
        :key="item._id"
        class="flex items-center pl-5 py-2 rounded-lg m-3 border-b-4 border border-gray-200"
      >
        <clip-entry :item="item" :index="index" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import ClipEntry from "components/clip/ClipEntry";
export default {
  components: {
    ClipEntry
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
.flip-list-move {
  transition: transform 0.7s;
}
</style>
