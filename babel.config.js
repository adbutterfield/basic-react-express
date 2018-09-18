module.exports = function(api) { // eslint-disable-line func-names
  api.cache(true);
  const presets = ['@babel/preset-env'];
  const plugins = ['transform-inline-environment-variables'];

  return {
    presets,
    plugins
  };
};
