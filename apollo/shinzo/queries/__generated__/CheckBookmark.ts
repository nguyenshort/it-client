/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetBookmarkInput } from "./../../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: CheckBookmark
// ====================================================

export interface CheckBookmark_bookmark {
  __typename: "Bookmark";
  id: string;
}

export interface CheckBookmark {
  bookmark: CheckBookmark_bookmark | null;
}

export interface CheckBookmarkVariables {
  filter: GetBookmarkInput;
}
