import { gql } from '#imports'

export const ROLE_DOCUMENT = gql`
  fragment RoleDoc on Role {
    id
    name
    user {
      id
      name
      slug
      avatar
    }
  }
`

export const GET_ROLES = gql`
  fragment RoleDoc on Role {
    id
    name
    user {
      id
      name
      slug
      avatar
    }
  }

  query GetRoles($filter: GetRolesInput!) {
    roles(filter: $filter) {
      id
      ...RoleDoc
    }
  }
`

export const GET_PROPOSAL = gql`
  query GetProposal($filter: GetProposalFilter!) {
    proposal(filter: $filter) {
      id
      letter
      resume
      status
      note
      role {
        id
      }
      project {
        id
        owner {
          id
        }
      }
    }
  }
`
