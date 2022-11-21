/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetProposalFilter, ProposalStatus } from "./../../../../__generated__/shinzoTypes";

// ====================================================
// GraphQL query operation: GetProposal
// ====================================================

export interface GetProposal_proposal_role {
  __typename: "Role";
  id: string;
}

export interface GetProposal_proposal {
  __typename: "Proposal";
  id: string;
  letter: string;
  resume: string;
  status: ProposalStatus;
  note: string;
  role: GetProposal_proposal_role;
}

export interface GetProposal {
  proposal: GetProposal_proposal;
}

export interface GetProposalVariables {
  filter: GetProposalFilter;
}
