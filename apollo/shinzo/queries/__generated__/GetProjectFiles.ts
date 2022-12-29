/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProjectFiles
// ====================================================

export interface GetProjectFiles_project {
  __typename: "Project";
  id: string;
  files: string[];
}

export interface GetProjectFiles {
  project: GetProjectFiles_project;
}

export interface GetProjectFilesVariables {
  project: string;
}
