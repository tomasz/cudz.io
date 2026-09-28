import { defineConfig } from "vite-plus";

export default defineConfig({
  lint: {
    plugins: ["typescript", "react", "jsx-a11y", "import", "unicorn"],
    categories: {
      correctness: "error",
      suspicious: "error",
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  run: {
    cache: true,
  },
  staged: {
    "*": "vp check --fix",
  },
});
