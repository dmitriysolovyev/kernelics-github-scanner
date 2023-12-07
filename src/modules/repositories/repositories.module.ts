import { Module } from '@nestjs/common';
import { RepositoriesResolver } from '@/modules/repositories/repositories.resolver';
import { GitHubModule } from '@/modules/github/github.module';

@Module({
  imports: [GitHubModule],
  providers: [RepositoriesResolver],
  exports: [RepositoriesResolver],
})
export class RepositoriesModule {}
