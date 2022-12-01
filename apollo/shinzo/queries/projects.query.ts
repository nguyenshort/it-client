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
