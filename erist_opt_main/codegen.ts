import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3010/graphql',
  // schema: './graphql.schema.json',

  documents: 'libs/meta-graphql/**/*.{graphql,gql}',
  generates: {
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
    'libs/meta-graphql/src/lib/types.ts': {
      plugins: ['typescript'],
    },
    'libs/meta-graphql/src/lib': {
      preset: 'near-operation-file',
      presetConfig: {
        folder: '../queries',
        extension: '.ts',
        baseTypesPath: './types.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
    },
  },
};
export default config;
