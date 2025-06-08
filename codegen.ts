import type { CodegenConfig } from "@graphql-codegen/cli";

const URL = process.env.BACKEND_URL;

const config: CodegenConfig = {
  overwrite: true,
  schema: [`${URL}:8081/graphql`, `${URL}:8082/graphql`],
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
