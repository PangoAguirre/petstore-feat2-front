import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.BACKEND_URL}/graphql`,
  documents: "src/lib/graphql/**/*.graphql",
  generates: {
    "src/lib/graphql/codegen.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
