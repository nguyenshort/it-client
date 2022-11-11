/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetProjectsFilter, ProjectStatus } from "./../../../../__generated__/shinzoTypes";

// ====================================================
// GraphQL query operation: GetHomeRunning
// ====================================================

export interface GetHomeRunning_projects_roles_user {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
  slug: string;
}

export interface GetHomeRunning_projects_roles {
  __typename: "Role";
  id: string;
  name: string;
  user: GetHomeRunning_projects_roles_user | null;
}

export interface GetHomeRunning_projects {
  __typename: "Project";
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  status: ProjectStatus;
  content: string | null;
  estimate: number[];
  roles: GetHomeRunning_projects_roles[];
  createdAt: number;
}

export interface GetHomeRunning {
  projects: GetHomeRunning_projects[];
}

export interface GetHomeRunningVariables {
  filter: GetProjectsFilter;
}
