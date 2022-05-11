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
import { View } from "./View";
import { Announcement } from "./Announcement";
import { Suggestion } from "./Suggestion";

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

  @Field(() => [View], {nullable: "items"})
  @OneToMany(() => View, (view) => view.author)
  views: View[];

  @Field(() => [Announcement], {nullable: "items"})
  @OneToMany(() => Announcement, (announcement) => announcement.author)
  announcements: Announcement[];

  @Field(() => [Suggestion], {nullable: "items"})
  @OneToMany(() => Suggestion, (suggestion) => suggestion.author)
  suggestions: Suggestion[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
