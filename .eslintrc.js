module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "standard",
    // 'prettier'
    "plugin:prettier/recommended", // 添加 prettier 插件
    // "@typescript-eslint",
    // 'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'prettier/@typescript-eslint'
    // "@vue/typescript/recommended",
    // "@vue/prettier/@typescript-eslint",
    // "@vue/prettier",
  ],
  parserOptions: {
    ecmaVersion: 13,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    camelcase: "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/no-absolute-path": "off",
    "import/no-extraneous-dependencies": "off",
    "vue/no-multiple-template-root": "off",
    "no-useless-call": "error",
    "prefer-promise-reject-errors": ["error", { allowEmptyReject: true }],
    // 'linebreak-style': 'off',
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: [
          "state",
          "config",
          "options",
          "piniaInstance",
        ],
      },
    ],
  },
};
