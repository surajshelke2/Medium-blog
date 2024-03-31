// setImmediate.js

// In a browser environment, use setTimeout as an alternative to setImmediate
const setImmediateBrowser = (fn: () => void) => setTimeout(fn, 0);

// Export the setImmediate function based on the environment
module.exports = typeof global !== 'undefined' ? global.setImmediate : setImmediateBrowser;
