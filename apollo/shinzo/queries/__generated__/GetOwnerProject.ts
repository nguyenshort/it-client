/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOwnerProject
// ====================================================

export interface GetOwnerProject_project_owner {
  __typename: "User";
  id: string;
}

export interface GetOwnerProject_project {
  __typename: "Project";
  id: string;
  owner: GetOwnerProject_project_owner;
}

export interface GetOwnerProject {
  project: GetOwnerProject_project;
}

export interface GetOwnerProjectVariables {
  project: string;
}
