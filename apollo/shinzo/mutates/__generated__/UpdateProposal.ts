/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateProposalInput, ProposalStatus } from "./../../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: UpdateProposal
// ====================================================

export interface UpdateProposal_updateProposal_role {
  __typename: "Role";
  id: string;
  name: string;
}

export interface UpdateProposal_updateProposal {
  __typename: "Proposal";
  id: string;
  letter: string;
  resume: string;
  createdAt: number;
  note: string;
  role: UpdateProposal_updateProposal_role;
  status: ProposalStatus;
}

export interface UpdateProposal {
  updateProposal: UpdateProposal_updateProposal;
}

export interface UpdateProposalVariables {
  input: UpdateProposalInput;
}
