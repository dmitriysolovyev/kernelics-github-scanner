import { Field, ObjectType, Int } from '@nestjs/graphql';
import { RepositoryOwner } from '@/modules/repositories/entities/repository-owner.entity';
import { RepositoryWebhook } from '@/modules/repositories/entities/repository-webhook.entity';
import { RepositoryFile } from '@/modules/repositories/entities/repository-file.entity';

@ObjectType()
export class RepositoryDetails {
  @Field(() => String)
  name: string;

  @Field(() => RepositoryOwner)
  owner: RepositoryOwner;

  @Field(() => Int)
  size: number;

  @Field(() => Boolean)
  private: boolean;

  @Field(() => Int)
  numberOfFiles: number;

  @Field(() => [RepositoryWebhook])
  activeWebhooks: RepositoryWebhook[];

  @Field(() => RepositoryFile)
  yamlFile: RepositoryFile;
}
