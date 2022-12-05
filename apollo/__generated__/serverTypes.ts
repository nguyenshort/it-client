/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ProjectStatus {
  DONE = "DONE",
  PREPARE = "PREPARE",
  RUNNING = "RUNNING",
  STUCK = "STUCK",
}

export enum ProposalStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  WAITING = "WAITING",
}

export enum StepStatus {
  DONE = "DONE",
  WAITING = "WAITING",
}

export enum UserRole {
  ADMIN = "ADMIN",
  SP_ADMIN = "SP_ADMIN",
  USER = "USER",
}

export interface CountProjectsFilter {
  category?: string | null;
  name?: string | null;
  status?: ProjectStatus | null;
  technologies?: string[] | null;
}

export interface CreateBookmarkInput {
  project: string;
}

export interface CreateProposalInput {
  letter?: string | null;
  resume?: string | null;
  role: string;
}

export interface ExampleProjectsFilter {
  category?: string | null;
  exclude?: string[] | null;
  limit: number;
  name?: string | null;
  status?: ProjectStatus | null;
  technologies?: string[] | null;
}

export interface GetBookmarkInput {
  project: string;
}

export interface GetProjectsFilter {
  category?: string | null;
  limit: number;
  name?: string | null;
  offset: number;
  sort: string;
  status?: ProjectStatus | null;
  technologies?: string[] | null;
}

export interface GetProposalFilter {
  project: string;
}

export interface GetRolesInput {
  project: string;
}

export interface UpdateProposalInput {
  id: string;
  letter?: string | null;
  resume?: string | null;
  role?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
