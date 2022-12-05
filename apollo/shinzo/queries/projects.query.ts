import gql from 'graphql-tag'

export const QUICK_SEARCH = gql`
  query QuickSearch($filter: GetProjectsFilter!) {
      projects(filter: $filter) {
          id
          logo
          name
          comments
          bookmarks
      }
  }
`

export const ADVANCED_SEARCH = gql`
  query AdvancedSearch($filter: GetProjectsFilter!) {
      projects(filter: $filter) {
          id
          name
          content
          link
          technologies {
              id
              name
              slug
          }
          roles {
              id
              name
              user {
                  id
              }
          }
      }
  }
`
