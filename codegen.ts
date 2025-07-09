import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  ignoreNoDocuments: true, // for better experience with the watcher
  documents: ["src/**/*.ts"],
  schema: "https://gift-fights.api-numa.site/graphql",
  generates: {
    "./src/shared/api/graphql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
