const mainUrl = "http://localhost:3000/";

export const subaminsUrl = `${mainUrl}subamins`;
export const usersSubamins = (name: string, limit: number) =>
  `${mainUrl}subamins?q=${name}&_limit=${limit}&id=`;
export const feed = (what: string, order: string, limit: number) =>
  `${mainUrl}posts?_sort=${what}&_order=${order}&_limit=${limit}`;

export const postsUrl = (what: string, order: string, limit: number) =>
  `${mainUrl}posts?_sort=${what}&_order=${order}&_limit=${limit}`;
export const allPostsUrl = (what: string, order: string) =>
  `${mainUrl}posts?_sort=${what}&_order=${order}`;
export const allSubaminsUrl = (what: string, order: string) =>
  `${mainUrl}subamins?_sort=${what}&_order=${order}`;
export const userPosts = (
  id: number,
  what: string,
  order: string,
  limit: number
) =>
  `${mainUrl}posts?authorId=${id}&_sort=${what}&_order=${order}&_limit=${limit}`;
export const userSavedPosts = (limit: number) =>
  `${mainUrl}posts?id=&_limit=${limit}`;
export const postDetails = (id: number) => `${mainUrl}posts/${id}`;
export const subaminDetails = (id: number) => `${mainUrl}subamins/${id}`;

export const subaminsSearch = (
  question: string,
  what: string,
  order: string,
  limit: number
) =>
  `${mainUrl}subamins?q=${question}&_sort=${what}&_order=${order}&_limit=${limit}`;

export const postSearch = (
  question: string,
  what: string,
  order: string,
  limit: number
) =>
  `${mainUrl}posts?q=${question}&_sort=${what}&_order=${order}&_limit=${limit}`;
export const subaminsPosts = (
  id: number,
  what: string,
  order: string,
  limit: number
) =>
  `${mainUrl}posts?subaminId=${id}&_sort=${what}&_order=${order}&_limit=${limit}`;
export const loginUrl = (username: string) =>
  `${mainUrl}users?username=${username}`;
export const userDetails = (id: number) => `${mainUrl}users/${id}`;
export const userCreatedSubamins = (id: number) =>
  `${mainUrl}subamins?authorId=${id}`;
