import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.SCHEMAS_URLS?.split(";"),
  documents: "src/lib/graphql/**/*.graphql",
  generates: {
    "src/lib/graphql/codegen.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
