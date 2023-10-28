import axios from "axios";
import { Post } from "./Posts";
const API_URL = "http://localhost:8000";

export default class PostService {
  constructor() {}

  getPosts() {
    const url = `${API_URL}/api/posts/`;
    return axios.get(url).then((response) => response.data);
  }

  setLikePost(id: number, post: Post) {
    const url = `${API_URL}/api/posts/` + id + "/";
    return axios.patch(url, { ...post }).then((response) => response.data);
  }

  createPost(text: string) {
    const url = `${API_URL}/api/posts/`;
    return axios.post(url, text);
  }

  deletePost(id: number) {
    const url = `${API_URL}/api/posts/` + id + "/";
    return axios.delete(url).then((response) => response.data);
  }
}
