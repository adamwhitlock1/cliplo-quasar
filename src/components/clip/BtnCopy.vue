<template>
  <q-btn flat size="sm" color="primary" icon="content_copy" @click="copy(item)">
    <q-tooltip
      transition-show="scale"
      transition-hide="scale"
      anchor="top middle"
      self="center middle"
      content-class="bg-blue-600"
    >
      copy to clipboard
    </q-tooltip>
  </q-btn>
</template>

<script>
import { copyToClipboard } from "quasar";
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    async copy(item) {
      const isNew = await this.isFirstItemDifferent(item);
      if (isNew) {
        this.addDuplicateToDb(item);
      }
      copyToClipboard(item.text)
        .then(e => {
          this.$q.notify("Copied to Clipboard!");
        })
        .catch(err => {
          alert(`Error copying to clipboard \n ${JSON.stringify(err)}`);
        });
    },
    async isFirstItemDifferent(item) {
      try {
        const res = await this.$db.stream.findOne({}).sort({ createdAt: -1 });
        if (res.text === item.text) return false;
        return true;
      } catch (err) {
        // catches errors both in fetch and response.json
        console.log("ERROR GETTING LAST DB ITEM");
        console.log({ err });

        return err;
      }
    },
    async addDuplicateToDb(item) {
      let duplicatedItem = { ...item };
      delete duplicatedItem._id;
      delete duplicatedItem.createdAt;
      delete duplicatedItem.updatedAt;
      await this.$db.insertEntry(
        this.$db.stream,
        duplicatedItem,
        this.$electronWindow
      );
    }
  }
};
</script>

<style></style>
