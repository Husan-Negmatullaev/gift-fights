import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  ignoreNoDocuments: true, // for better experience with the watcher
  documents: ["src/**/*.ts"],
  schema: "./schema.graphql",
  generates: {
    "./src/shared/api/graphql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
