interface CommentProperties {
  id: number;
  author: string;
  authorId: number;
  upvotes: number;
  date: string;
  text: string;
  upvotedBy: number[];
  downvotedBy: number[];
}
export interface PostProperties {
  id: number;
  subaminId: number;
  subaminName: string;
  subaminLogo: string;
  title: string;
  description: string;
  author: string;
  authorId: number;
  upvotes: number;
  upvotedBy: number[];
  downvotedBy: number[];
  date: string;
  comments?: CommentProperties[];
  image?: string;
}
export interface Subamin {
  id: number;
  name: string;
  members: number;
  logo: string;
  desc: string;
  background?: string;
  birthday: string;
  authorId: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  followedSubaminas: number[];
  birthday?: string;
  darkMode: boolean;
  logo?: string;
  savedPosts: number[];
}
