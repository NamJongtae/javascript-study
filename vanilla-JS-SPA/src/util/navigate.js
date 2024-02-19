export default function navigate (to, isReplace = false) {
  const historyChangeEvent = new CustomEvent("historychange", {
    detail: {
      to,
      isReplace,
    },
  });
  dispatchEvent(historyChangeEvent);
};

