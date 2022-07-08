module.exports = {
  extends: require.resolve('@umijs/max/stylelint'),
  rules: {
    'value-no-vendor-prefix': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'no-empty-source': null,
    'selector-class-pattern': null,
    'custom-property-no-missing-var-function': null,
    'function-no-unknown': null,
  },
};
