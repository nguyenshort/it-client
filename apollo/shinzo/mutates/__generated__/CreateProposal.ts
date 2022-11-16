/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateProposalInput } from "./../../../../__generated__/shinzoTypes";

// ====================================================
// GraphQL mutation operation: CreateProposal
// ====================================================

export interface CreateProposal_createProposal {
  __typename: "Proposal";
  id: string;
}

export interface CreateProposal {
  createProposal: CreateProposal_createProposal;
}

export interface CreateProposalVariables {
  input: CreateProposalInput;
}
