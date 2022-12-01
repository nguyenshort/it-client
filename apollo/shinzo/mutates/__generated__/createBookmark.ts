/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBookmarkInput } from "./../../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: createBookmark
// ====================================================

export interface createBookmark_toggleBookmark {
  __typename: "Bookmark";
  id: string;
}

export interface createBookmark {
  toggleBookmark: createBookmark_toggleBookmark | null;
}

export interface createBookmarkVariables {
  input: CreateBookmarkInput;
}
