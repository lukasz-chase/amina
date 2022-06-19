export interface CommentProperties {
  _id: String;
  author: string;
  authorId: String;
  upvotes: number;
  createdAt: string;
  text: string;
  upvotedBy: String[];
  downvotedBy: String[];
}
export interface PostProperties {
  _id: String;
  subaminId: String;
  subaminName: string;
  subaminLogo: string;
  title: string;
  description: string;
  author: string;
  authorId: String;
  upvotes: number;
  upvotedBy: String[];
  downvotedBy: String[];
  createdAt: string;
  comments?: CommentProperties[];
  images?: [string];
}
export interface Subamin {
  _id: String;
  name: string;
  members: number;
  logo: string;
  desc: string;
  backgroundImg?: string;
  createdAt: string;
  authorId: String;
}

export interface User {
  _id: String;
  username: string;
  email: string;
  password: string;
  followedSubaminas: String[];
  birthday?: string;
  darkMode: boolean;
  avatar?: string;
  savedPosts: String[];
}
