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

export enum StepStatus {
  DONE = "DONE",
  WAITING = "WAITING",
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

//==============================================================
// END Enums and Input Objects
//==============================================================
