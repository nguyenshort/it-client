/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetProjectsFilter, ProjectStatus } from "./../../../../__generated__/shinzoTypes";

// ====================================================
// GraphQL query operation: GetHomeOnBoard
// ====================================================

export interface GetHomeOnBoard_projects_owner {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
  slug: string;
}

export interface GetHomeOnBoard_projects_category {
  __typename: "Category";
  id: string;
  name: string;
  slug: string;
}

export interface GetHomeOnBoard_projects_roles_user {
  __typename: "User";
  id: string;
  name: string;
  slug: string;
}

export interface GetHomeOnBoard_projects_roles {
  __typename: "Role";
  id: string;
  name: string;
  updatedAt: number;
  user: GetHomeOnBoard_projects_roles_user | null;
}

export interface GetHomeOnBoard_projects {
  __typename: "Project";
  id: string;
  name: string;
  covers: string[];
  owner: GetHomeOnBoard_projects_owner;
  category: GetHomeOnBoard_projects_category;
  bookmarks: number;
  comments: number;
  content: string | null;
  roles: GetHomeOnBoard_projects_roles[];
  status: ProjectStatus;
  slug: string;
}

export interface GetHomeOnBoard {
  projects: GetHomeOnBoard_projects[];
}

export interface GetHomeOnBoardVariables {
  filter: GetProjectsFilter;
}
