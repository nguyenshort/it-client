export const CHECK_BOOKMARK = gql`
  query CheckBookmark($filter: GetBookmarkInput!) {
      bookmark(filter: $filter) {
          id
      }
  }
`
