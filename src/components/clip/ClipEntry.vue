<template>
  <div class="flex w-full">
    <div class="w-3/4 items-center justify-start">
      <div class="m-0 pl-2 text-blue-grey-7 flex items-center">
        <p
          class="font-bold text-xs text-gray-500 flex items-center"
          v-if="getClipWindowData(item)"
        >
          <q-icon size="xs" name="source" class="mr-1 text-gray-400" />
          {{ getClipWindowData(item).window }}
          <q-btn
            round
            flat
            color="blue-grey-4"
            icon="link"
            @click="openLink(item.window.url)"
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
      </div>
      <div
        v-if="format === 'text'"
        class="rounded mt-2 py-2 px-3 bg-white text-gray-700 shadow-lg"
      >
        {{ item.text }}
      </div>
      <div
        class="rounded mt-2 py-2 px-3 bg-white overflow-hidden shadow-md mb-1"
        v-else
        v-html="item.html"
      ></div>
    </div>

    <div
      class="w-1/4 flex content-center flex-wrap justify-center items-center"
    >
      <div class="w-full flex justify-center items-center mt-0">
        <q-btn
          flat
          size="sm"
          color="red"
          icon="delete"
          @click="removeItem(item)"
          v-if="index !== 0"
        />
        <q-btn
          flat
          size="sm"
          color="accent"
          icon="share"
          @click="openLink(createCarbonLink(item.text))"
        >
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="top middle"
            self="center middle"
            content-class="bg-purple-600"
          >
            share via carbon.now.sh
          </q-tooltip>
        </q-btn>
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
        <q-btn
          flat
          size="sm"
          color="primary"
          icon="content_copy"
          @click="copy(item.text)"
        >
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
      </div>
      <div class="w-full flex text-xs justify-center items-center mt-2">
        <p class="bg-indigo-100 text-gray-600 px-3 rounded-full">
          <q-icon name="today" class="pr-1" />{{ formatDate(item.createdAt) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { shell } from "electron";
import { mapState, mapActions } from "vuex";
import { date } from "quasar";
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState("user", ["format"])
  },
  methods: {
    ...mapActions("clip", ["remove"]),
    getClipWindowData(item) {
      const url = item.window.url || false;
      if (item.window && item.window.owner) {
        const window = `${item.window.owner.name} | ${item.window.title}`;
        return {
          window: window.length > 90 ? `${window.substring(0, 90)}...` : window,
          url
        };
      }
      return false;
    },
    createCarbonLink(text) {
      return encodeURI(`https://carbon.now.sh/?code=${text}`);
    },
    formatDate(timeStamp) {
      return date.formatDate(timeStamp, "MMM Do h:m a");
    },
    openLink(target) {
      shell.openExternal(target);
    },
    copy(text) {
      this.$copyText(text).then(e => {
        this.$q.notify("Copied to Clipboard!");
      });
    },
    async removeItem(item) {
      this.remove({ db: this.$db, item });
    }
  }
};
</script>

<style></style>
