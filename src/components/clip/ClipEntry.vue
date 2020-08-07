<template>
  <div class="flex w-full">
    <div class="w-3/4 items-center justify-start">
      <div class="m-0 pl-1 text-blue-grey-7 flex items-center">
        <clip-window-details :item="item" />
      </div>
      <div class="rounded mt-2 py-2 px-3 bg-white text-gray-700 border">
        {{ item.text }}
      </div>
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
import ClipWindowDetails from "components/clip/ClipWindowDetails";
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
    ClipWindowDetails,
    BtnDelete,
    BtnCarbon,
    BtnSave,
    BtnCopy
  },
  methods: {
    formatDate(timeStamp) {
      return date.formatDate(timeStamp, "MMM Do h:m a");
    }
  }
};
</script>

<style></style>
