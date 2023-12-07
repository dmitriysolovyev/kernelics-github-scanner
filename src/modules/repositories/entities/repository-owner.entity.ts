import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RepositoryOwner {
  @Field(() => String)
  login: string;
}
