// TODO Add return types
export interface GitHubApi {
  listRepositories(token: string);
  getRepository(token: string, owner: string, repositoryName: string);
  getTree(
    token: string,
    owner: string,
    repositoryName: string,
    treeSha: string,
  );
  getWebhooks(token: string, owner: string, repositoryName: string);
  getContent(
    token: string,
    owner: string,
    repositoryName: string,
    path: string,
  );
}

export const GitHubApi = Symbol.for('GitHubApi');
