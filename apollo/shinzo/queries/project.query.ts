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
          group
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


export const GET_PROJECT_FILES = gql`
    query GetProjectFiles($project: String!) {
        project(project: $project) {
            id
            files
        }
    }
`

export const GET_PROJECT_STEPS = gql`
    query GetProjectSteps($project: String!) {
        project(project: $project) {
            id
            steps {
                id
                name
                order
                status
                content
            }
        }
    }
`

export const GET_PROJECT_MEMBERS = gql`
    query GetProjectMembers($project: String!) {
        project(project: $project) {
            id
            owner {
                id
                name
                avatar
                slug
            }
            roles {
                id
                name
                group
                content
                user {
                    id
                    name
                    avatar
                    slug
                }
            }
        }
    }
`

export const GET_OWNER_PROJECT = gql`
  query GetOwnerProject($project: String!) {
    project(project: $project) {
      id
      owner {
        id
      }
    }
  }
`
