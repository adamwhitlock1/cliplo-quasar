import { shallowMount, createLocalVue, mount, config } from "@vue/test-utils";
import DeleteClipButton from "src/components/clip/DeleteClipButton.vue";
import findByTestId from "~/test/jest/utils/FindByTestId";

describe("DeleteClipButton", () => {
  it("Renders DeleteClipButton", () => {
    const wrapper = shallowMount(DeleteClipButton, {
      propsData: {
        text: "test text"
      }
    });

    expect(findByTestId(wrapper, "delete").exists()).toBe(true);
  });
});
