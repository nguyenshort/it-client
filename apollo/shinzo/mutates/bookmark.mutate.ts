import { gql } from '#imports'

export const BOOKMARK_PROJECT = gql`
  mutation ToogleBookmark($input: CreateBookmarkInput!) {
      toggleBookmark(input: $input) {
          id
      }
  }
`
