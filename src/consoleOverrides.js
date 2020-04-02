/* eslint-disable */
(function() {
  const { warn } = console;

  console.warn = function() {
    if (arguments[0].includes('componentWillMount has been renamed')) return;
    warn.apply(console, arguments);
  };
})();
