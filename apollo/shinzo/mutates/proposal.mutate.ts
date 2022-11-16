import { gql } from '#imports'

export const SUBMIT_PROPOSAL = gql`
  mutation CreateProposal($input: CreateProposalInput!) {
    createProposal(input: $input) {
      id
    }
  }
`
