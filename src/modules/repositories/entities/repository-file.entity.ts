import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class RepositoryFile {
  @Field(() => String)
  name: string;

  @Field(() => String)
  content: string;
}
