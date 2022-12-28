/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RoleDoc
// ====================================================

export interface RoleDoc_user {
  __typename: "User";
  id: string;
  name: string;
  slug: string;
  avatar: string | null;
}

export interface RoleDoc {
  __typename: "Role";
  id: string;
  name: string;
  group: number | null;
  user: RoleDoc_user | null;
}
