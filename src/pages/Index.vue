<template>
  <q-page expand class="flex ">
    <div v-if="stream.length > 0" class="full-width">
      <div class="row justify-between items-center q-pa-sm bg-cyan-1">
        <div class="flex items-center">
          <input
            type="text"
            class="px-3 py-2 border rounded"
            placeholder="search by text"
            v-model="queryText"
            @keyup.enter="search"
          />
        </div>
        <div class="col justify-end flex items-center">
          <div class="text-teal-800 mr-2">
            Total entries: {{ stream.length }}
          </div>
          <button
            @click.prevent="doClearStream"
            class="flex items-center px-3 py-1 border text-teal-600 border-teal-600 rounded-full"
          >
            <q-icon class="w-6 h-6" size="sm" name="delete_forever" />Clear All
            Entries
          </button>
          <q-btn
            outline
            rounded
            size=""
            color="cyan-9"
            @click.prevent="testAction"
            label="Test Action"
          />
        </div>
      </div>
      <clip-list v-if="stream.length > 0" :items="stream" />
    </div>
    <div v-else>
      <q-inner-loading>
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";

import ClipList from "components/clip/ClipList";

export default {
  name: "PageIndex",
  components: {
    ClipList
  },
  data() {
    return {
      queryText: ""
    };
  },
  computed: {
    ...mapState("clip", ["stream"])
  },
  methods: {
    ...mapActions("user", ["setOption"]),
    ...mapActions("clip", ["clearStream", "searchStream"]),
    search() {
      this.searchStream({ queryText: this.queryText, db: this.$db });
    },
    doClearStream() {
      this.$q.loading.show({
        delay: 0 // ms
      });
      setTimeout(() => {
        this.clearStream(this.$db);
        this.$q.loading.hide();
      }, 700);
    },
    async testAction() {
      this.$electronWindow.webContents.send("newMessage", { text: "dude" });

      // this.setOption({
      //   db: this.$db,
      //   payload: { option: "format", value: "html" }
      // });
    }
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
