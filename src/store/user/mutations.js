export function option(state, payload) {
  state[payload.option] = payload.value;
}

export function seed(state, payload) {
  state.format = payload.format;
  state.font = payload.font;
  state.fontColor = payload.fontColor;
  state.isMenuOpen = payload.isMenuOpen;
}
