<template>
  <q-page expand class="flex ">
    <div v-if="stream.length > 0" class="full-width">
      <div class="row justify-between items-center q-pa-sm bg-cyan-1">
        <div class="col text-teal-800">Total entries: {{ stream.length }}</div>
        <div class="col justify-end flex">
          <q-btn
            outline
            rounded
            color="cyan-9"
            @click.prevent="clearClipStream"
            label="Clear Entries"
            icon="delete_forever"
          />
          <q-btn
            outline
            rounded
            size=""
            color="cyan-9"
            @click.prevent="testAction"
            label="Test Action"
            icon="delete_forever"
          />
        </div>
      </div>
      <div
        v-for="item in stream"
        :key="item.id"
        class="row flex items-center p-3 rounded-lg m-3 border-b-4 border border-gray-200 entry-wrapper"
      >
        <div class="col items-center justify-start">
          <div class="m-0 text-blue-grey-7">
            <q-chip icon="event"
              >{{ formatDate(item.createdAt) }} |
              {{ item.charCount }} Chars</q-chip
            >
            <q-btn
              round
              flat
              color="blue-grey-4"
              icon="content_copy"
              class="entry-copy"
              @click="copy(item.text)"
              size="xs"
            />
          </div>
          <div class="m-0 px-3 text-gray-700">
            {{ item.text }}
          </div>
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
const { ipcRenderer } = require("electron");
import { mapActions } from "vuex";
import { date } from "quasar";
export default {
  name: "PageIndex",
  data() {
    return {
      stream: []
    };
  },
  methods: {
    ...mapActions("user", ["setOption"]),
    testAction() {
      this.setOption({
        db: this.$db,
        payload: { option: "format", value: "html" }
      });
    },
    copy(text) {
      this.$copyText(text).then(
        function(e) {
          console.log(e);
        },
        function(e) {
          alert("Can not copy");
          console.log(e);
        }
      );
    },
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
  transition: all 0.3s ease;
}

.entry-wrapper:hover .entry-copy {
  opacity: 1;
}
</style>
