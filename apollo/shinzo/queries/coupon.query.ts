import gql from 'graphql-tag'

export const SORT_COUPONS = gql`
  query GetHomeOnBoard($filter: GetProjectsFilter!) {
    projects(filter: $filter) {
      id
      name
      covers
      owner {
        id
        name
        avatar
        slug
      }
      bookmarks
      comments
      roles {
        id
        name
        updatedAt
        user {
          id
          name
          slug
        }
      }
      status
      slug
    }
  }
`
