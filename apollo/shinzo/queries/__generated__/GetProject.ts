/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StepStatus, ProjectStatus } from "./../../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetProject
// ====================================================

export interface GetProject_project_category {
  __typename: "Category";
  id: string;
  name: string;
  slug: string;
}

export interface GetProject_project_owner {
  __typename: "User";
  id: string;
  avatar: string | null;
  name: string;
  slug: string;
}

export interface GetProject_project_roles_user {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
  slug: string;
}

export interface GetProject_project_roles {
  __typename: "Role";
  id: string;
  name: string;
  user: GetProject_project_roles_user | null;
}

export interface GetProject_project_steps {
  __typename: "Step";
  id: string;
  name: string;
  status: StepStatus;
}

export interface GetProject_project_technologies {
  __typename: "Technology";
  id: string;
  name: string;
  slug: string;
}

export interface GetProject_project {
  __typename: "Project";
  id: string;
  bookmarks: number;
  category: GetProject_project_category;
  comments: number;
  content: string | null;
  cover: string;
  estimate: number[];
  files: string[];
  link: string | null;
  logo: string | null;
  name: string;
  owner: GetProject_project_owner;
  roles: GetProject_project_roles[];
  slug: string;
  steps: GetProject_project_steps[];
  technologies: GetProject_project_technologies[];
  status: ProjectStatus;
}

export interface GetProject {
  project: GetProject_project;
}

export interface GetProjectVariables {
  project: string;
}
