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
