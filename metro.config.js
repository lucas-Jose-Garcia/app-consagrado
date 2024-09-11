const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
  assetPlugins: ["expo-asset/tools/hashAssetFiles"],
};

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg").concat(["ttf", "otf", "png", "jpg"]),
  sourceExts: [...resolver.sourceExts, "svg", "ttf", "otf", "png", "jpg"],
};

module.exports = withNativeWind(config, { input: "./src/styles/global.css" });
