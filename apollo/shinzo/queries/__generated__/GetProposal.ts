/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetProposalFilter, ProposalStatus } from "./../../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetProposal
// ====================================================

export interface GetProposal_proposal_role {
  __typename: "Role";
  id: string;
}

export interface GetProposal_proposal_project_owner {
  __typename: "User";
  id: string;
}

export interface GetProposal_proposal_project {
  __typename: "Project";
  id: string;
  owner: GetProposal_proposal_project_owner;
}

export interface GetProposal_proposal {
  __typename: "Proposal";
  id: string;
  letter: string;
  resume: string;
  status: ProposalStatus;
  note: string;
  role: GetProposal_proposal_role;
  project: GetProposal_proposal_project;
}

export interface GetProposal {
  proposal: GetProposal_proposal | null;
}

export interface GetProposalVariables {
  filter: GetProposalFilter;
}
