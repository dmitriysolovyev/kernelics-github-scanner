import { Field, ObjectType, Int } from '@nestjs/graphql';
import { RepositoryOwner } from '@/modules/repositories/entities/repository-owner.entity';

@ObjectType()
export class Repository {
  @Field(() => String)
  name: string;

  @Field(() => RepositoryOwner)
  owner: RepositoryOwner;

  @Field(() => Int)
  size: number;

  @Field(() => Boolean)
  private: boolean;
}
