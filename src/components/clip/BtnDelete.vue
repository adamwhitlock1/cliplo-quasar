<template>
  <q-btn
    flat
    size="sm"
    color="red"
    icon="delete"
    @click="removeItem(item)"
    v-if="index !== 0"
  />
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions("clip", ["remove"]),
    async removeItem(item) {
      this.remove({ db: this.$db, item });
    }
  }
};
</script>

<style></style>
