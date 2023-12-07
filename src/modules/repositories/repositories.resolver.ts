import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GitHubApi } from '@/modules/github/github.interface';
import { ConfigToken } from '@/modules/config/config.token';
import { Config } from '@/modules/config/config.entity';
import { Repository } from '@/modules/repositories/entities/repository.entity';
import { RepositoryDetails } from '@/modules/repositories/entities/repository-details.entity';
import { RepositoryFile } from '@/modules/repositories/entities/repository-file.entity';

@Resolver(() => Repository)
export class RepositoriesResolver {
  constructor(
    @Inject(GitHubApi) private gitHubService: GitHubApi,
    @Inject(ConfigToken) private config: Config,
  ) {}

  @Query(() => [Repository])
  async getAllRepositories(
    @Args('gitHubToken', { type: () => String }) gitHubToken: string,
  ): Promise<Repository[]> {
    return this.gitHubService.listRepositories(gitHubToken);
  }

  @Query(() => RepositoryDetails)
  async getRepository(
    @Args('gitHubToken', { type: () => String }) gitHubToken: string,
    @Args('ownerName', { type: () => String }) ownerName: string,
    @Args('repositoryName', { type: () => String }) repositoryName: string,
    @Args('treeSHA', { type: () => String }) treeSha: string,
  ): Promise<RepositoryDetails> {
    // TODO Split into nested resolvers
    const [repository, { tree }, activeWebhooks] = await Promise.all([
      this.gitHubService.getRepository(gitHubToken, ownerName, repositoryName),
      this.gitHubService.getTree(
        gitHubToken,
        ownerName,
        repositoryName,
        treeSha,
      ),
      this.getActiveWebhooks(gitHubToken, ownerName, repositoryName),
    ]);

    const file = this.findYamlFile(tree);
    let yamlFile: RepositoryFile;
    if (file) {
      const yamlContent = await this.gitHubService.getContent(
        gitHubToken,
        ownerName,
        repositoryName,
        file.path,
      );
      yamlFile = {
        name: yamlContent.name,
        content: this.decodeFileContent(
          yamlContent.content,
          yamlContent.encoding,
        ),
      };
    }

    return {
      ...repository,
      numberOfFiles: this.getNumberOfFiles(tree),
      activeWebhooks,
      yamlFile,
    };
  }

  private async getActiveWebhooks(
    gitHubToken: string,
    ownerName: string,
    repositoryName: string,
  ) {
    const result = await this.gitHubService.getWebhooks(
      gitHubToken,
      ownerName,
      repositoryName,
    );
    return result.filter((webhook) => webhook.active);
  }

  private getNumberOfFiles(tree) {
    return tree.filter((item) => item.type == 'blob').length;
  }

  private findYamlFile(tree) {
    return tree.find(
      (item) => item.type == 'blob' && item.path.slice(-5) == '.yaml',
    );
  }

  private decodeFileContent(content: string, encoding: BufferEncoding): string {
    const buff = Buffer.from(content, encoding);
    return buff.toString('utf-8');
  }
}
