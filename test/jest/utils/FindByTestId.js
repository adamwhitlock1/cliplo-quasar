export default (wrapper, testId) => {
  return wrapper.find(`[data-testid="${testId}"]`);
};
