/* eslint-disable */
(function() {
  const { error } = console;

  console.error = function() {
    if (
      typeof arguments[0] === 'undefined' ||
      (!arguments[0].includes('If you want to write it to the DOM,') &&
        !arguments[0].includes(
          'If you intentionally want it to appear in the DOM'
        ))
    ) {
      error.apply(console, arguments);
    }
  };
})();
