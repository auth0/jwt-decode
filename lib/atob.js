const global =
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof window !== "undefined" && window);

export default (typeof global !== "undefined" &&
  global.atob &&
  global.atob.bind(global));