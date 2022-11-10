import gql from 'graphql-tag'

export const GET_HOME_BOARD = gql`
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
      category {
        id
        name
        slug
      }
      bookmarks
      comments
      content
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
