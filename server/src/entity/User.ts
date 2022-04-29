import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Comment } from "./Comment";
import { Post } from "./Post";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  name: string;

  @Field(() => [Comment], {nullable: "items"})
  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @Field(() => [Post], {nullable: "items"})
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
