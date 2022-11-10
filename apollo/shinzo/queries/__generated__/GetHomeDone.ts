/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetProjectsFilter } from "./../../../../__generated__/shinzoTypes";

// ====================================================
// GraphQL query operation: GetHomeDone
// ====================================================

export interface GetHomeDone_projects_roles_user {
  __typename: "User";
  id: string;
  name: string;
  slug: string;
  avatar: string | null;
}

export interface GetHomeDone_projects_roles {
  __typename: "Role";
  id: string;
  name: string;
  user: GetHomeDone_projects_roles_user | null;
}

export interface GetHomeDone_projects {
  __typename: "Project";
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  link: string | null;
  comments: number;
  bookmarks: number;
  estimate: number[];
  roles: GetHomeDone_projects_roles[];
}

export interface GetHomeDone {
  projects: GetHomeDone_projects[];
}

export interface GetHomeDoneVariables {
  filter: GetProjectsFilter;
}
