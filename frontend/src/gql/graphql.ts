/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  post: Post;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  post: Post;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createLike: Like;
  createPost: Post;
  createUser: User;
  deleteLike: Scalars['Boolean']['output'];
  deletePost: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  updatePost: Post;
  updateUser: User;
};


export type MutationCreateCommentArgs = {
  content: Scalars['String']['input'];
  postID: Scalars['ID']['input'];
};


export type MutationCreateLikeArgs = {
  postID: Scalars['ID']['input'];
};


export type MutationCreatePostArgs = {
  content: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};


export type MutationDeleteLikeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdatePostArgs = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  userInput: UserInput;
};

export type Post = {
  __typename?: 'Post';
  comments: Array<Comment>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  likes: Array<Like>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  post?: Maybe<Post>;
  posts: Array<Post>;
  user?: Maybe<User>;
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  comments: Array<Comment>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  likes: Array<Like>;
  mailaddress: Scalars['String']['output'];
  posts: Array<Post>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserInput = {
  mailaddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, content: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, username: string }, comments: Array<{ __typename?: 'Comment', id: string }>, likes: Array<{ __typename?: 'Like', id: string }> }> };

export type CreateUserMutationVariables = Exact<{
  userInput: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, mailaddress: string, username: string } };


export const GetPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mailaddress"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;