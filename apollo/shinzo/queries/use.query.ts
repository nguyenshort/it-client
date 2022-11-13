import { gql } from '#imports'

export const GET_ME = gql`
  query GetMe {
    me {
      id
      name
      role
      slug
      createdAt
      avatar
    }
  }
`
