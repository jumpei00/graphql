/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n        query getUser {\n            user {\n                id\n                username\n                mailaddress\n            }\n        }\n    ": types.GetUserDocument,
    "\n        query getPosts {\n            posts {\n                id\n                content\n                createdAt\n                updatedAt\n                user {\n                    id\n                    username\n                }\n                comments {\n                    id\n                }\n                likes {\n                    id\n                }\n            }\n        }\n    ": types.GetPostsDocument,
    "\n\tquery getPost($postId: ID!) {\n\t\tpost(id: $postId) {\n\t\t\tid\n\t\t\tcontent\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t}\n\t\t\tcomments {\n\t\t\t\tid\n\t\t\t\tcontent\n\t\t\t\tcreatedAt\n\t\t\t\tupdatedAt\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tusername\n\t\t\t\t}\n\t\t\t}\n\t\t\tlikes {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": types.GetPostDocument,
    "\n\tmutation createComment($postId: ID!, $content: String!) {\n\t\tcreateComment(postID: $postId, content: $content) {\n\t\t\tid\n\t\t\tcontent\n\t\t}\n\t}\n": types.CreateCommentDocument,
    "\n        mutation createPost($content: String!) {\n            createPost(content: $content) {\n                id\n                content\n            }\n        }\n    ": types.CreatePostDocument,
    "\n        mutation createUser($userInput: UserInput!) {\n            createUser(userInput: $userInput) {\n                id\n                mailaddress\n                username\n            }\n        }\n    ": types.CreateUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query getUser {\n            user {\n                id\n                username\n                mailaddress\n            }\n        }\n    "): (typeof documents)["\n        query getUser {\n            user {\n                id\n                username\n                mailaddress\n            }\n        }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query getPosts {\n            posts {\n                id\n                content\n                createdAt\n                updatedAt\n                user {\n                    id\n                    username\n                }\n                comments {\n                    id\n                }\n                likes {\n                    id\n                }\n            }\n        }\n    "): (typeof documents)["\n        query getPosts {\n            posts {\n                id\n                content\n                createdAt\n                updatedAt\n                user {\n                    id\n                    username\n                }\n                comments {\n                    id\n                }\n                likes {\n                    id\n                }\n            }\n        }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery getPost($postId: ID!) {\n\t\tpost(id: $postId) {\n\t\t\tid\n\t\t\tcontent\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t}\n\t\t\tcomments {\n\t\t\t\tid\n\t\t\t\tcontent\n\t\t\t\tcreatedAt\n\t\t\t\tupdatedAt\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tusername\n\t\t\t\t}\n\t\t\t}\n\t\t\tlikes {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery getPost($postId: ID!) {\n\t\tpost(id: $postId) {\n\t\t\tid\n\t\t\tcontent\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t}\n\t\t\tcomments {\n\t\t\t\tid\n\t\t\t\tcontent\n\t\t\t\tcreatedAt\n\t\t\t\tupdatedAt\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tusername\n\t\t\t\t}\n\t\t\t}\n\t\t\tlikes {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation createComment($postId: ID!, $content: String!) {\n\t\tcreateComment(postID: $postId, content: $content) {\n\t\t\tid\n\t\t\tcontent\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation createComment($postId: ID!, $content: String!) {\n\t\tcreateComment(postID: $postId, content: $content) {\n\t\t\tid\n\t\t\tcontent\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation createPost($content: String!) {\n            createPost(content: $content) {\n                id\n                content\n            }\n        }\n    "): (typeof documents)["\n        mutation createPost($content: String!) {\n            createPost(content: $content) {\n                id\n                content\n            }\n        }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation createUser($userInput: UserInput!) {\n            createUser(userInput: $userInput) {\n                id\n                mailaddress\n                username\n            }\n        }\n    "): (typeof documents)["\n        mutation createUser($userInput: UserInput!) {\n            createUser(userInput: $userInput) {\n                id\n                mailaddress\n                username\n            }\n        }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;