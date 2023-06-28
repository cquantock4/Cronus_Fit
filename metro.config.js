const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

const exclusionList = require('metro-config/src/defaults/exclusionList');

// exclusionList is a function that takes an array of regexes and combines
// them with the default exclusions to return a single regex.


config.resolver.blacklistRE = exclusionList([/#current-cloud-backend\/.*/])
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: false,
  },
})

module.exports = config