<template>
  <div class="flex w-full">
    <div class="w-3/4 items-center justify-start">
      <div class="m-0 pl-2 text-blue-grey-7 flex items-center">
        <p
          class="font-bold text-xs text-gray-500 flex items-center"
          v-if="getClipWindowData(item).hasData"
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
        <btn-delete :index="index" :item="item" />
        <btn-carbon :item="item" />
        <btn-save :item="item" />
        <btn-copy :item="item" />
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
import { mapState } from "vuex";
import { date } from "quasar";
import BtnDelete from "components/clip/BtnDelete";
import BtnCarbon from "components/clip/BtnCarbon";
import BtnSave from "components/clip/BtnSave";
import BtnCopy from "components/clip/BtnCopy";
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
  components: {
    BtnDelete,
    BtnCarbon,
    BtnSave,
    BtnCopy
  },
  computed: {
    ...mapState("user", ["format"])
  },
  methods: {
    getClipWindowData(item) {
      if (item.window && item.window.owner) {
        const window = `${item.window.owner.name} ${
          item.window.title ? "|" : item.window.title
        } ${item.window.title}`;

        return {
          hasData: true,
          window: window.length > 90 ? `${window.substring(0, 90)}...` : window,
          url: item.window.url
        };
      }
      return {
        hadData: false,
        message: window.stdout
      };
    },
    formatDate(timeStamp) {
      return date.formatDate(timeStamp, "MMM Do h:m a");
    },
    openLink(target) {
      shell.openExternal(target);
    }
  }
};
</script>

<style></style>
