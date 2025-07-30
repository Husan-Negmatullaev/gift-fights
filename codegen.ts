import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  ignoreNoDocuments: true, // for better experience with the watcher
  documents: ['src/**/*.ts'],
  schema: 'https://api.gift-fights.xyz/graphql',
  generates: {
    './src/shared/api/graphql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
