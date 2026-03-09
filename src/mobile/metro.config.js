const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Watch the shared directory for changes
const sharedDir = path.resolve(__dirname, "../shared");
config.watchFolders = [sharedDir];

// Resolve shared imports
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, "node_modules"),
  path.resolve(__dirname, "../../node_modules"),
];

// Ensure shared directory files are resolved
config.resolver.extraNodeModules = {
  "@shared": sharedDir,
};

module.exports = config;
