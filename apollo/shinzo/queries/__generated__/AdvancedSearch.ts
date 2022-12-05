/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetProjectsFilter, ProjectStatus } from "./../../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: AdvancedSearch
// ====================================================

export interface AdvancedSearch_projects_technologies {
  __typename: "Technology";
  id: string;
  name: string;
  slug: string;
}

export interface AdvancedSearch_projects_roles_user {
  __typename: "User";
  id: string;
}

export interface AdvancedSearch_projects_roles {
  __typename: "Role";
  id: string;
  name: string;
  user: AdvancedSearch_projects_roles_user | null;
}

export interface AdvancedSearch_projects {
  __typename: "Project";
  id: string;
  slug: string;
  name: string;
  content: string | null;
  link: string | null;
  status: ProjectStatus;
  technologies: AdvancedSearch_projects_technologies[];
  roles: AdvancedSearch_projects_roles[];
}

export interface AdvancedSearch {
  projects: AdvancedSearch_projects[];
}

export interface AdvancedSearchVariables {
  filter: GetProjectsFilter;
}
