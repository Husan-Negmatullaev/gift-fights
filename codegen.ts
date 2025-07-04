import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  ignoreNoDocuments: true, // for better experience with the watcher
  documents: ['src/**/*.ts'],
  schema: 'http://159.223.157.138:4040/graphql',
  generates: {
    './src/shared/api/graphql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
