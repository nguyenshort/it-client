/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ExampleProjectsFilter, ProjectStatus } from "./../../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: ExampleProjects
// ====================================================

export interface ExampleProjects_exampleProjects_owner {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
  slug: string;
}

export interface ExampleProjects_exampleProjects_category {
  __typename: "Category";
  id: string;
  name: string;
  slug: string;
}

export interface ExampleProjects_exampleProjects_roles_user {
  __typename: "User";
  id: string;
  name: string;
  slug: string;
}

export interface ExampleProjects_exampleProjects_roles {
  __typename: "Role";
  id: string;
  name: string;
  updatedAt: number;
  user: ExampleProjects_exampleProjects_roles_user | null;
}

export interface ExampleProjects_exampleProjects {
  __typename: "Project";
  id: string;
  name: string;
  cover: string;
  owner: ExampleProjects_exampleProjects_owner;
  category: ExampleProjects_exampleProjects_category;
  bookmarks: number;
  comments: number;
  content: string | null;
  roles: ExampleProjects_exampleProjects_roles[];
  status: ProjectStatus;
  slug: string;
}

export interface ExampleProjects {
  exampleProjects: ExampleProjects_exampleProjects[];
}

export interface ExampleProjectsVariables {
  filter: ExampleProjectsFilter;
}
