import { Module, Logger } from '@nestjs/common';
import { GitHubService } from '@/modules/github/github.service';
import { GitHubApi } from '@/modules/github/github.interface';
import { GitHubLoggerToken } from '@/modules/github/github.logger.token';

@Module({
  providers: [
    {
      provide: GitHubLoggerToken,
      useFactory: () => new Logger(GitHubModule.name),
    },
    {
      provide: GitHubApi,
      useClass: GitHubService,
    },
  ],
  exports: [GitHubApi],
})
export class GitHubModule {}
