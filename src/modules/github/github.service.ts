import { Injectable, Inject, Logger } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import { GitHubApi } from '@/modules/github/github.interface';
import { ConfigToken } from '@/modules/config/config.token';
import { Config } from '@/modules/config/config.entity';
import { GitHubLoggerToken } from '@/modules/github/github.logger.token';

@Injectable()
export class GitHubService implements GitHubApi {
  constructor(
    @Inject(ConfigToken) private readonly config: Config,
    @Inject(GitHubLoggerToken) private readonly logger: Logger,
  ) {}

  public async listRepositories(token: string) {
    const octokit = new Octokit({ auth: token });
    const { data } = await octokit.repos.listForAuthenticatedUser();
    this.logger.debug('listRepositories response', data);
    return data;
  }

  public async getRepository(
    token: string,
    owner: string,
    repositoryName: string,
  ) {
    const octokit = new Octokit({ auth: token });
    const { data } = await octokit.repos.get({
      owner,
      repo: repositoryName,
    });
    this.logger.debug('getRepository response', data);
    return data;
  }

  public async getTree(
    token: string,
    owner: string,
    repositoryName: string,
    treeSha: string,
  ) {
    const octokit = new Octokit({ auth: token });
    const { data } = await octokit.git.getTree({
      owner,
      repo: repositoryName,
      tree_sha: treeSha,
      recursive: 'true',
    });
    this.logger.debug('getTree response', data);
    return data;
  }

  public async getWebhooks(
    token: string,
    owner: string,
    repositoryName: string,
  ) {
    const octokit = new Octokit({ auth: token });
    const { data } = await octokit.repos.listWebhooks({
      owner,
      repo: repositoryName,
    });
    this.logger.debug('getWebhooks response', data);
    return data;
  }

  public async getContent(
    token: string,
    owner: string,
    repositoryName: string,
    path: string,
  ) {
    const octokit = new Octokit({ auth: token });
    const { data } = await octokit.repos.getContent({
      owner,
      repo: repositoryName,
      path,
    });
    this.logger.debug('getContent response', data);
    return data;
  }
}
