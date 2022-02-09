import {Column, CreateDateColumn, Entity, ManyToOne,OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Comment} from "./Comment";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('varchar')
    title: string;
    @Column('text')
    content: string;
    @OneToMany(type =>Comment, comment => comment.post)
    comments: Comment[];
    @ManyToOne(type => User, user => user.posts)
    author:User;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
