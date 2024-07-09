module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
    'react-native/react-native': true,
  },
  extends: [
    'plugin:react/recommended',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['react', 'react-native', '@typescript-eslint'],
  ignorePatterns: ['!.*', 'dist', 'node_modules'],
  rules: {
    indent: [
      'error',
      'tab',
      {
        SwitchCase: 1,
        ignoredNodes: ['ConditionalExpression'],
      },
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'double'],
    semi: ['error', 'always'],
    // 'no-console': ['error'],
    'no-unused-vars': 'off', // Disable the default rule for unused variables
    '@typescript-eslint/no-unused-vars': ['warn', { vars: 'all' }], // Enable TypeScript-specific rule for unused variables,
    '@typescript-eslint/no-explicit-any': 'off',
    'no-mixed-spaces-and-tabs': 0,
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
};
// {
//   "env": {
//     "browser": true,
//     "es2021": true,
//     "react-native/react-native": true
//   },
//   "extends": ["standard-with-typescript", "plugin:react/recommended", "prettier"],
//   "parserOptions": {
//     "ecmaVersion": "latest",
//     "sourceType": "module"
//   },
//   "plugins": ["react", "react-native"],
//   "rules": {
//     // allow .js files to contain JSX code
//     "react/jsx-filename-extension": [
//       1,
//       { "extensions": [".ts", ".tsx", ".js", ".jsx"] }
//     ],
//     // prevent eslint to complain about the "styles" variable being used before it was defined
//     "no-use-before-define": ["error", { "variables": false }],
//     // ignore errors for the react-navigation package
//     "react/prop-types": [
//       "error",
//       { "ignore": ["navigation", "navigation.navigate"] }
//     ],
//     // ignore errors for import directives
//     "import/extensions": [
//       "error",
//       "ignorePackages",
//       {
//         "js": "never",
//         "jsx": "never",
//         "ts": "never",
//         "tsx": "never"
//       }
//     ]
//   },
//   "settings": {
//     "react": {
//       "version": "detect"
//     }
//   }
// }
