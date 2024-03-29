module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "comma-spacing": ["error", { before: false, after: true }],
    "prefer-const": ["off"],
    "prettier/prettier": "error",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          BigInt: false,
          // un-ban a type that's banned by default
          "{}": false,
        },
        extendDefaults: true,
      },
    ],
    "@typescript-eslint/no-inferrable-types": ["off"],
  },
};
