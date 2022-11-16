/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProjectRunningDoc
// ====================================================

export interface ProjectRunningDoc_owner {
  __typename: "User";
  id: string;
  name: string;
  slug: string;
  avatar: string | null;
}

export interface ProjectRunningDoc_roles_user {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
  slug: string;
}

export interface ProjectRunningDoc_roles {
  __typename: "Role";
  id: string;
  name: string;
  user: ProjectRunningDoc_roles_user | null;
}

export interface ProjectRunningDoc {
  __typename: "Project";
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  content: string | null;
  owner: ProjectRunningDoc_owner;
  roles: ProjectRunningDoc_roles[];
  createdAt: number;
}
