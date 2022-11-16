/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProjectItemDoc
// ====================================================

export interface ProjectItemDoc_owner {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
  slug: string;
}

export interface ProjectItemDoc_category {
  __typename: "Category";
  id: string;
  name: string;
  slug: string;
}

export interface ProjectItemDoc_roles_user {
  __typename: "User";
  id: string;
  name: string;
  slug: string;
}

export interface ProjectItemDoc_roles {
  __typename: "Role";
  id: string;
  name: string;
  updatedAt: number;
  user: ProjectItemDoc_roles_user | null;
}

export interface ProjectItemDoc {
  __typename: "Project";
  id: string;
  name: string;
  cover: string;
  owner: ProjectItemDoc_owner;
  category: ProjectItemDoc_category;
  bookmarks: number;
  comments: number;
  content: string | null;
  roles: ProjectItemDoc_roles[];
  slug: string;
}
