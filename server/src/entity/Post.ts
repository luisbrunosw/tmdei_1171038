import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Comment } from "./Comment";
import { User } from "./User";

@ObjectType()
@Entity("posts")
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  author: User;

  @Field()
  @Column({ type: "varchar" })
  title: string;

  @Field()
  @Column({ type: "text" })
  body: string;

  @Field(() => [Comment], {nullable: "items"})
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
