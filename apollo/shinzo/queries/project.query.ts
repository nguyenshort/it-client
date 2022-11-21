import gql from 'graphql-tag'

export const GET_PROJECT = gql`
  query GetProject($project: String!) {
    project(project: $project) {
      id
      bookmarks
      category {
        id
        name
        slug
      }
      comments
      content
      cover
      estimate
      files
      link
      logo
      name
      owner {
        id
        avatar
        name
        slug
      }
      roles {
        id
        name
        user {
          id
          name
          avatar
          slug
        }
      }
      slug
      steps {
        id
        name
        status
      }
      technologies {
        id
        name
        slug
      }
      status
    }
  }
`
