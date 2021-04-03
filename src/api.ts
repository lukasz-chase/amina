const mainUrl = "http://localhost:3000/";

export const subaminsUrl = `${mainUrl}subamins`;

export const postsUrl = (what: string, order: string) =>
  `${mainUrl}posts?_sort=${what}&_order=${order}`;

export const postDetails = (id: number) => `${mainUrl}posts/${id}`;

export const subaminsSearch = (question: string) =>
  `${mainUrl}subamins?q=${question}`;
export const postSearch = (question: string) => `${mainUrl}posts?q=${question}`;
