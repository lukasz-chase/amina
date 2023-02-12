import axios from "axios";
import { formData } from "./pages/LoginPage";
import { PostData } from "./pages/CreatePost";
import { SubaminData } from "./pages/CreateCommunity";

const API = axios.create({
  baseURL: "https://sleepy-hare-turtleneck.cyclic.app/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile") || "{}").token
    }`;
  }
  return req;
});

//USER
export const signIn = (formData: formData) => API.post("user/signin", formData);
export const signUp = (formData: formData) => API.post("user/signup", formData);
export const getUserById = (id: number) => API.get(`user/${id}`);
export const joinSubamin = (id: String, subamindId: String) =>
  API.patch(`user/joinSubamin/${id}`, { data: subamindId });
export const changeDarkMode = (id: String) => API.patch(`user/darkMode/${id}`);
export const savePost = (id: String, postId: String) =>
  API.patch(`user/savePost/${id}`, { data: postId });
export const updateInfo = (id: String, data: any) =>
  API.post(`user/updateInfo/${id}`, data);
export const updateEmail = (id: String, email: string, password: string) =>
  API.patch(`user/updateEmail/${id}`, {
    data: { email, password },
  });
export const updatePassword = (
  id: String,
  password: string,
  newPassword: string
) =>
  API.patch(`user/updatePassword/${id}`, {
    data: { password, newPassword },
  });

//POSTS
export const createPost = (post: PostData) => API.post(`posts`, post);
export const getPostDetails = (id: String) => API.get(`posts/${id}`);
export const getFeedPosts = (id: String, limit: number, order: string) =>
  API.get(`posts/feed/${id}?limit=${limit}&orderBy=${order}`);
export const getPosts = (limit: number, order: string) =>
  API.get(`posts?limit=${limit}&orderBy=${order}`);
export const likePost = (id: String, userId: String, action: string) =>
  API.patch(`posts/like/${id}?action=${action}`, { data: userId });
export const getUserSavedPosts = (id: String, limit: number) =>
  API.get(`posts/savedPosts/${id}?limit=${limit}`);
export const getUserPosts = (id: String, limit: number, order: string) =>
  API.get(`posts/user/${id}?limit=${limit}&orderBy=${order}`);
export const getSubaminPosts = (limit: number, order: string, id?: String) =>
  API.get(`posts/subamin/${id}?limit=${limit}&orderBy=${order}`);
export const getSearchPost = (
  limit: number,
  order: string,
  searchQuery: string
) =>
  API.get(
    `posts/search?searchQuery=${searchQuery}&limit=${limit}&orderBy=${order}`
  );
export const deletePost = (id: String) => API.delete(`posts/delete/${id}`);

//SUBAMINS
export const createSubamin = (subamin: SubaminData) =>
  API.post(`subamins`, subamin);
export const editSubamin = (id: String, subamin: SubaminData) =>
  API.patch(`subamins/${id}`, subamin);
export const getSubaminDetails = (id: String) => API.get(`subamins/${id}`);
export const getUserSubaminsBySearch = (id: String, searchQuery: string) =>
  API.get(`subamins/user/search/${id}?searchQuery=${searchQuery}`);
export const getUserCreatedSubamins = (id: String) =>
  API.get(`subamins/userCreated/${id}`);
export const getSubaminsBySearch = (
  limit: number,
  order: string,
  searchQuery: string
) =>
  API.get(
    `subamins/search/?searchQuery=${searchQuery}&limit=${limit}&orderBy=${order}`
  );
export const getTopSubamins = () => API.get(`subamins/top`);
export const deleteSubamin = (id: String) =>
  API.delete(`subamins/delete/${id}`);

//COMMENTS
export const getComments = (id: String, order: string) =>
  API.get(`comments/${id}?orderBy=${order}`);
export const createComment = (comment: any) =>
  API.post(`comments/create`, comment);
export const editComment = (id: String, comment: any) =>
  API.patch(`comments/edit/${id}`, { text: comment });
export const deleteComment = (id: String) =>
  API.delete(`comments/delete/${id}`);
export const likeComment = (id: String, userId: String, action: string) =>
  API.patch(`comments/like/${id}?action=${action}`, { data: userId });
