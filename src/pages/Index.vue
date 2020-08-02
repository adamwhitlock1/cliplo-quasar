<template>
  <q-page expand class="flex ">
    <div v-if="stream.length > 0" class="full-width">
      <div class="row justify-between items-center q-pa-sm bg-cyan-1">
        <div class="col">Total entries: {{ stream.length }}</div>
        <div class="col justify-end flex">
          <q-btn
            outline
            rounded
            color="primary"
            @click.prevent="clearClipStream"
            label="Clear Entries"
            icon="delete_forever"
          />
        </div>
      </div>
      <div
        v-for="item in stream"
        :key="item.id"
        class="row flex items-center q-pa-md shadow-2 rounded-borders q-mt-md q-mx-sm entry-wrapper"
      >
        <div class="col-auto">
          <q-btn
            round
            flat
            color="blue-grey-4"
            @click.prevent="copyClip(item.text)"
            icon="content_copy"
            class="entry-copy"
          />
        </div>
        <div class="col items-center justify-start">
          <p class="q-ma-none text-blue-grey-7">
            {{ formatDate(item.createdAt) }} | {{ item.charCount }} Chars
          </p>
          <pre class="q-ma-none">{{ item.text }}</pre>
        </div>

        <div class="col-auto flex justify-end">
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
    async clearClipStream() {
      try {
        const removed = await this.$db.stream.remove({}, { multi: true });
        console.log({ removed });
        this.stream = [];
      } catch (err) {
        console.log("ERROR LOADING CLIP STREAM");
        console.log(err);
      }
    },
    copyClip(clip) {
      console.log({ clip });
    },
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

<style scoped>
.entry-copy {
  opacity: 0;
}

.entry-wrapper:hover .entry-copy {
  opacity: 1;
}
</style>
