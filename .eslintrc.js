module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "prettier",
    "prettier/react",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "sort-keys-fix"],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "import/no-default-export": "error",
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-unresolved": "off",
    "no-unused-vars": "warn",
    quotes: ["error", "double"],
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "sort-keys": "error",
    "sort-keys-fix/sort-keys-fix": "error",
  },
};
