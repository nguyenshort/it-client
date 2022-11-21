import { gql } from '#imports'

export const SUBMIT_PROPOSAL = gql`
  mutation CreateProposal($input: CreateProposalInput!) {
    createProposal(input: $input) {
      id
    }
  }
`

export const UPDATE_PROPOSAL = gql`
  mutation UpdateProposal($input: UpdateProposalInput!) {
    updateProposal(input: $input) {
      id
      letter
      resume
      createdAt
      note
      role {
        id
        name
      }
      status
    }
  }
`
