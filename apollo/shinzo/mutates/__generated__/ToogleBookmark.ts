/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBookmarkInput } from "./../../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: ToogleBookmark
// ====================================================

export interface ToogleBookmark_toggleBookmark {
  __typename: "Bookmark";
  id: string;
}

export interface ToogleBookmark {
  toggleBookmark: ToogleBookmark_toggleBookmark | null;
}

export interface ToogleBookmarkVariables {
  input: CreateBookmarkInput;
}
