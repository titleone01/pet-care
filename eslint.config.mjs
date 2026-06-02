import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".codex-debug-asar/**",
      ".npm-cache/**",
      "node_modules/**",
      "out/**",
      "build/**",
      ".chrome-*/**",
      ".edge-*/**"
    ]
  },
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      "@next/next/no-img-element": "off"
    }
  }
];

export default eslintConfig;
