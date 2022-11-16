import gql from 'graphql-tag'

export const GET_HOME_BOARD = gql`
  fragment ProjectItemDoc on Project {
    id
    name
    cover
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
    slug
  }

  query GetHomeOnBoard($filter: GetProjectsFilter!) {
    projects(filter: $filter) {
      id
      ...ProjectItemDoc
    }
  }
`

export const GET_HOME_RUNNING = gql`
  fragment ProjectRunningDoc on Project {
    id
    name
    slug
    logo
    content
    owner {
      id
      name
      slug
      avatar
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
    createdAt
  }

  query GetHomeRunning($filter: GetProjectsFilter!) {
    projects(filter: $filter) {
      id
      ...ProjectRunningDoc
    }
  }
`

export const GET_HOME_DONE = gql`
  query GetHomeDone($filter: GetProjectsFilter!) {
    projects(filter: $filter) {
      id
      name
      slug
      logo
      link
      comments
      bookmarks
      estimate
      roles {
        id
        name
        user {
          id
          name
          slug
          avatar
        }
      }
    }
  }
`

export const EXAMPLE_PROJECTS = gql`
  query ExampleProjects($filter: ExampleProjectsFilter!) {
    exampleProjects(filter: $filter) {
      id
      name
      cover
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
