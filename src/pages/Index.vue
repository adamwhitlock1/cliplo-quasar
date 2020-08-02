<template>
  <q-page class="flex flex-center">
    <div v-if="stream.length > 0">
      <div class="row">
        <div class="col q-pa-sm">Total entries: {{ stream.length }}</div>
      </div>
      <div
        v-for="item in stream"
        :key="item.id"
        class="row flex items-center q-pa-md inset-shadow"
      >
        <div class="col-10 flex items-center">
          <p class="q-ma-none">
            {{ item.text }} | {{ item.charCount }} Chars |
            {{ formatDate(item.createdAt) }}
          </p>
        </div>

        <div class="col-2 flex justify-end">
          <q-btn flat round color="red" icon="favorite" />
          <q-btn flat round color="teal" icon="bookmark" />
          <q-btn flat round color="primary" icon="share" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
const { clipboard, remote, ipcRenderer } = require("electron");
import { date } from "quasar";
export default {
  name: "PageIndex",
  data() {
    return {
      stream: []
    };
  },
  methods: {
    async getClipStream() {
      try {
        this.stream = await this.$db.stream.find({}).sort({ createdAt: -1 });
      } catch (err) {
        console.log("ERROR LOADING CLIP STREAM");
        console.log(err);
      }
    },
    formatDate(timeStamp) {
      return date.formatDate(timeStamp, "MMM Do h:m:s a");
    }
  },
  async created() {
    this.getClipStream();
    ipcRenderer.on("newClipAdded", () => {
      this.getClipStream();
    });
  }
};
</script>
