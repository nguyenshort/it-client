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
          slug
          name
          content
          link
          logo
          status
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

export const COUNT_SEARCH = gql`
  query CountSearch($filter: CountProjectsFilter!) {
      projectsCount(filter: $filter)
  }
`
