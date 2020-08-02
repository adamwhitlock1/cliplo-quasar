export function option(state, payload) {
  state[payload.option] = payload.value;
}
