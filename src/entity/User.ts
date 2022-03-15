import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
import md5 from "md5";
import _ from "lodash";
// import {getDatabaseConnection} from "../../lib/getDatabaseConnection";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column("varchar")
  username: string;
  @Column("varchar")
  passwordDigest: string;
  @OneToMany("Post", "author")
  posts: Post[];
  @OneToMany("Comment", "user")
  comments: Comment[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirm: [] as string[],
  };
  password: string;
  passwordConfirm: string;

  async validate() {
    // const found = await (await getDatabaseConnection())
    //     .manager.find(
    //         User, {username: this.username});
    // if (found.length > 0) {
    //     this.errors.username.push('用户名已存在，不能重复注册')
    // }
    if (this.username.trim() === "") {
      this.errors.username.push("用户名不能为空");
    }
    if (!/[a-zA-Z0-9]/.test(this.username.trim())) {
      this.errors.username.push("用户名格式不合法");
    }
    if (this.username.trim().length > 20) {
      this.errors.username.push("用户名太长");
    }
    if (this.username.trim().length < 3) {
      this.errors.username.push("用户名太短");
    }
    if (this.password.trim() === "") {
      this.errors.password.push("密码不能为空");
    }
    if (this.password.trim() !== this.passwordConfirm.trim()) {
      this.errors.passwordConfirm.push("两次输入密码不一致");
    }
  }

  hasErrors() {
    return !!Object.values(this.errors).find((error) => error.length > 0);
  }

  @BeforeInsert()
  generatePasswordDigest() {
    this.passwordDigest = md5(this.password);
  }

  toJSON() {
    return _.omit(this, [
      "password",
      "passwordConfirm",
      "passwordDigest",
      "errors",
    ]);
  }
}
