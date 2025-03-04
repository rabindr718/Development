/**
 * Metro configuration for React Native
 * https://facebook.github.io/metro/docs/configuration
 *
 * @format
 */

module.exports = {
  transformer: {
    babelTransformerPath: require.resolve(
      "metro-react-native-babel-transformer"
    ),
  },
  resolver: {
    sourceExts: ["jsx", "js", "ts", "tsx", "json"],
  },
};
