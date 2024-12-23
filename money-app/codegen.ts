import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './graphql.schema.json',
  documents: 'apps/frontend/**/*.{graphql,gql}',
  generates: {
    'apps/frontend/__generated__/types.ts': {
      plugins: ['typescript'],
    },
    'apps/frontend/': {
      preset: 'near-operation-file',
      presetConfig: {
        folder: '__generated__',
        extension: '.tsx',
        baseTypesPath: '__generated__/types.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
