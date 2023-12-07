import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class RepositoryWebhook {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}
