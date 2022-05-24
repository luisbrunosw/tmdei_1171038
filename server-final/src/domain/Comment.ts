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
  } from "typeorm";
  import { Field, ID, ObjectType } from "type-graphql";
import { Post } from "./Post";
import { User } from "./User";
  
  @ObjectType()
  @Entity("comments")
  export class Comment extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "userId" })
    author: string;
  
    @Field()
    @Column({ type: "varchar" })
    title: string;
  
    @Field()
    @Column({ type: "text" })
    body: string;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: "postId" })
    post: string;

    @Field(() => [Comment], {nullable: "items"})
    @OneToMany(() => Comment, (comment) => comment.id)
    answers: Comment[];
    
    @ManyToOne(() => Comment, (comment) => comment.answers)
    @JoinColumn({ name: "threadId" })
    thread: string;
  
    @Field()
    @CreateDateColumn()
    createdAt: Date;
  
    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
  }