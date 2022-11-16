/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProjectDoneDoc
// ====================================================

export interface ProjectDoneDoc_roles_user {
  __typename: "User";
  id: string;
  name: string;
  slug: string;
  avatar: string | null;
}

export interface ProjectDoneDoc_roles {
  __typename: "Role";
  id: string;
  name: string;
  user: ProjectDoneDoc_roles_user | null;
}

export interface ProjectDoneDoc {
  __typename: "Project";
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  link: string | null;
  comments: number;
  bookmarks: number;
  estimate: number[];
  roles: ProjectDoneDoc_roles[];
}
