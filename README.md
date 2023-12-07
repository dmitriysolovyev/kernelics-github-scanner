## Description

Apollo GraphQL server

‌The server needs to support 2 scenarios

- Show List of Repositories
- Show Repo details

Make sure to add to your input a "developer token" from github and return the appropriate data for the scenario

### List of Repositories should contain the following information:

Repo name
Repo size
Repo owner

### Repo details should contain the following information:

Repo name
Repo size
Repo owner
Private\public repo
Number of files in the repo
Content of 1 yml file (any one that appear in the repo)
Ative webhooks

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Queries

```graphql
query (
    $gitHubToken: String!
) {
    getAllRepositories(gitHubToken: $gitHubToken) {
        name
        owner {
            login
        }
        size
    }
}
```

```graphql
query (
    $gitHubToken: String!
    $ownerName: String!
    $repositoryName: String!
    $treeSHA: String!
) {
    getRepository(
        gitHubToken: $gitHubToken
        ownerName: $ownerName
        repositoryName: $repositoryName
        treeSHA: $treeSHA
        ) {
        name
        owner {
            login
        }
        size
        private
        numberOfFiles
        activeWebhooks {
            id
            name
        }
        yamlFile {
            name
            content
        }
    }
}
```
