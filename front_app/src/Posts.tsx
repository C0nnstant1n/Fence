import * as React from "react";
import PostService from "./PostService";

const postService = new PostService();
interface Istate {
  data: string[];
  inputValue: string;
}

export interface Post {
  date: string;
  id: number;
  likesCount: number;
  text: string;
}
export default class Posts extends React.Component<any, Istate> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      inputValue: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit(event) {
    postService.createPost({ text: this.state.inputValue });
    this.getData();
    this.setState({ inputValue: "" });
  }

  getData() {
    postService.getPosts().then((result) => {
      this.setState({ data: result });
    });
  }

  componentDidMount(): void {
    this.getData();
  }

  setLike(post: Post) {
    post.likesCount += 1;
    postService.setLikePost(post.id, post);
    this.forceUpdate();
  }

  handleDelete(post: Post) {
    postService.deletePost(post.id);
    this.getData();
  }

  render() {
    return (
      <div id='posts'>
        {this.state.data.map((post) => (
          <div key={post.id} id={"post_" + post.id}>
            <p> {post.text} </p>
            <button onClick={() => this.setLike(post)}>
              {" "}
              {post.likesCount}
            </button>
            <p> Date : {Date(post.date)}</p>
            <button onClick={() => this.handleDelete(post)}>X</button>
            <hr />
          </div>
        ))}
        <input
          type='text'
          onChange={this.handleChange}
          value={this.state.inputValue}
        ></input>
        <button onClick={this.handleSubmit}>Send</button>
      </div>
    );
  }
}
