module.exports = {
  extends: [
    // # The Airbnb JavaScript Style Guide provides a reasonable guide for JS/React project
    // - Rules for JS:    https://github.com/airbnb/javascript
    // - Rules for React: https://github.com/airbnb/javascript/tree/master/react
    "airbnb"
  ],
  env: {
    browser: true,
    mocha: true
  },
  rules: {
    // As a convenience, allow to pass object in as props
    "react/forbid-prop-types": 0,

    // We will allow JSX to be written in .js files
    "react/jsx-filename-extension": 0,

    // Annoyance. Also promotes the use of "id"-attributes.
    "jsx-a11y/label-has-for": 0,

     // Annoyance
    "max-len": 0,

    // Must use .bind in order for "this" to be available in called function
    "react/jsx-no-bind": 0,

    // Allow to import stuff from dev dependencies (for unit testing)
    "import/no-extraneous-dependencies": [
      2,
      { devDependencies: true }
    ],

    // This could become a great annoyance as people use different git clients
    "linebreak-style": 0,

    // Sometimes, keeping arrow body in a lambda function will make it more readable
    "arrow-body-style": 0,

    //
    "react/no-array-index-key": 0,

    // Encourage use of pure functions
    "react/prefer-stateless-function": 1
  }
}
