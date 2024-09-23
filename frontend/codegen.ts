import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "../graph/post.graphqls",
	documents: ["src/**/*.tsx", "src/**/*.ts"],
	generates: {
		"./src/gql/": {
			preset: "client",
			config: {
				scalars: {
					DateTime: "Date",
				},
			},
		},
	},
};

export default config;
