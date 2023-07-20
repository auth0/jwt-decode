const global = (typeof globalThis !== "undefined" && globalThis) || window;

export default global.atob.bind(global);
