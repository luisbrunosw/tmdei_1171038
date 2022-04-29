import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    OneToOne,
  } from "typeorm";
  import { Field, ID, ObjectType } from "type-graphql";
import { Post } from "./Post";
import { User } from "./User";
  
  @ObjectType()
  @Entity("comments")
  export class Comment extends BaseEntity {
    @Field(() => ID)
    @ManyToOne(() => Comment, (comment) => comment.comments)
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

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: "postId" })
    post: Post;

    @OneToMany(() => Comment, (comment) => comment.id)
    comments: Comment[];
  
    @Field()
    @CreateDateColumn()
    createdAt: Date;
  
    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
  }