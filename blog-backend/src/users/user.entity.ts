import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from '../posts/post.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true , nullable: true})
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ unique: true, nullable: true })  
  facebookId: string;

  @Column({ unique: true, nullable: true })  
  googleId: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
