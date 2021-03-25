const mainUrl = "http://localhost:3000/";

export const subaminsUrl = `${mainUrl}subamins`;
export const postsUrl = (what: string, order: string) =>
  `${mainUrl}posts?_sort=${what}&_order=${order}`;
