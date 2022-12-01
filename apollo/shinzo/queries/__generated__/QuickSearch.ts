/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetProjectsFilter } from "./../../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: QuickSearch
// ====================================================

export interface QuickSearch_projects {
  __typename: "Project";
  id: string;
  logo: string | null;
  name: string;
  comments: number;
  bookmarks: number;
}

export interface QuickSearch {
  projects: QuickSearch_projects[];
}

export interface QuickSearchVariables {
  filter: GetProjectsFilter;
}
