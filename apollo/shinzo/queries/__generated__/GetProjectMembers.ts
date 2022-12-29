/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProjectMembers
// ====================================================

export interface GetProjectMembers_project_owner {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
  slug: string;
}

export interface GetProjectMembers_project_roles_user {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
  slug: string;
}

export interface GetProjectMembers_project_roles {
  __typename: "Role";
  id: string;
  name: string;
  group: number | null;
  user: GetProjectMembers_project_roles_user | null;
}

export interface GetProjectMembers_project {
  __typename: "Project";
  id: string;
  owner: GetProjectMembers_project_owner;
  roles: GetProjectMembers_project_roles[];
}

export interface GetProjectMembers {
  project: GetProjectMembers_project;
}

export interface GetProjectMembersVariables {
  project: string;
}
