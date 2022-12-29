/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StepStatus } from "./../../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetProjectSteps
// ====================================================

export interface GetProjectSteps_project_steps {
  __typename: "Step";
  id: string;
  name: string;
  order: number;
  status: StepStatus;
  content: string;
}

export interface GetProjectSteps_project {
  __typename: "Project";
  id: string;
  steps: GetProjectSteps_project_steps[];
}

export interface GetProjectSteps {
  project: GetProjectSteps_project;
}

export interface GetProjectStepsVariables {
  project: string;
}
