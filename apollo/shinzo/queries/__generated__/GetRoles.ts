/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetRolesInput } from "./../../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetRoles
// ====================================================

export interface GetRoles_roles_user {
  __typename: "User";
  id: string;
  name: string;
  slug: string;
  avatar: string | null;
}

export interface GetRoles_roles {
  __typename: "Role";
  id: string;
  name: string;
  group: number | null;
  user: GetRoles_roles_user | null;
}

export interface GetRoles {
  roles: GetRoles_roles[];
}

export interface GetRolesVariables {
  filter: GetRolesInput;
}
